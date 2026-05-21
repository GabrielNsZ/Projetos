import os
import json
import sqlite3
from flask import Flask, render_template, jsonify, request, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash

from src.algorithms.dijkstra import calcular_dijkstra
from src.algorithms.bfs import calcular_bfs

app = Flask(__name__)
app.secret_key = 'atlas_global_chave_secreta_super_segura' 

# ==========================================
# FUNÇÕES AUXILIARES
# ==========================================

def carregar_dados():
    try:
        with open('data/grafo.json', 'r', encoding='utf-8') as f:
            dados = json.load(f)
            
        grafo_processado = {v['id']: v for v in dados['vertices']}
        
        adjacencias = {v['id']: {} for v in dados['vertices']}
        for a in dados['arestas']:
            adjacencias[a['origem']][a['destino']] = a['peso']
            
        return grafo_processado, adjacencias
    except Exception as e:
        print(f"Erro ao carregar grafo.json: {e}")
        return {}, {}

def get_db_connection():
    conn = sqlite3.connect('atlas_global.db')
    conn.row_factory = sqlite3.Row
    
    conn.execute('''
        CREATE TABLE IF NOT EXISTS operadores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            especialidade TEXT NOT NULL,
            senha_hash TEXT NOT NULL
        )
    ''')
    conn.commit()
    return conn

DADOS_NOS, GRAFO_ADJACENCIA = carregar_dados()

# ==========================================
# ROTAS DO SISTEMA
# ==========================================

@app.route('/')
def raiz():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        senha = request.form.get('senha')
        
        conn = get_db_connection()
        usuario = conn.execute('SELECT * FROM operadores WHERE email = ?', (email,)).fetchone()
        conn.close()
        
        if usuario and check_password_hash(usuario['senha_hash'], senha):
            session['operador_id'] = usuario['id']
            session['operador_nome'] = usuario['nome']
            return redirect(url_for('mapa'))
        else:
            return render_template('login.html', erro="E-mail ou senha incorretos.")
            
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear() 
    return redirect(url_for('login'))

@app.route('/mapa')
def mapa():
    # Proteção de Rota: Barrando usuários não autenticados
    if 'operador_id' not in session:
        return redirect(url_for('login'))
        
    return render_template('index.html')

@app.route('/cadastro')
def cadastro():
    return render_template('cadastro.html')

@app.route('/cadastrar', methods=['POST'])
def cadastrar_usuario():
    nome = request.form.get('nome')
    email = request.form.get('email')
    especialidade = request.form.get('especialidade')
    senha = request.form.get('senha')
    
    senha_hash = generate_password_hash(senha, method='pbkdf2:sha256')
    
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO operadores (nome, email, especialidade, senha_hash)
            VALUES (?, ?, ?, ?)
        ''', (nome, email, especialidade, senha_hash))
        
        operador_id = cursor.lastrowid
        conn.commit()
        
    except sqlite3.IntegrityError:
        print(f"Erro: O e-mail {email} já está cadastrado.")
        return redirect(url_for('cadastro')) 
    except Exception as e:
        print(f"Erro no banco de dados: {e}")
        return "Erro interno do servidor", 500
    finally:
        # Garantindo que o banco de dados não trave em caso de erro
        if conn:
            conn.close()

    no_alocacao_padrao = "BASE_01" 
    caminho_grafo = os.path.join('data', 'grafo.json')
    
    try:
        with open(caminho_grafo, 'r+', encoding='utf-8') as f:
            grafo_data = json.load(f)
            
            if 'nodes' in grafo_data and no_alocacao_padrao in grafo_data['nodes']:
                if 'operadores_ativos' not in grafo_data['nodes'][no_alocacao_padrao]:
                    grafo_data['nodes'][no_alocacao_padrao]['operadores_ativos'] = []
                
                grafo_data['nodes'][no_alocacao_padrao]['operadores_ativos'].append({
                    "id_operador": operador_id,
                    "nome": nome,
                    "especialidade": especialidade
                })
                
                f.seek(0)
                json.dump(grafo_data, f, indent=4, ensure_ascii=False)
                f.truncate()
            else:
                print(f"Aviso: Nó {no_alocacao_padrao} não encontrado no grafo.")
                
    except FileNotFoundError:
        print(f"Aviso: Arquivo {caminho_grafo} não encontrado. Operador salvo apenas no DB relacional.")
    except json.JSONDecodeError:
        print("Erro: O arquivo grafo.json está mal formatado.")

    print(f"Operador {nome} ({especialidade}) cadastrado e alocado com sucesso!")
    
    # Após o cadastro, direciona para o login em vez do mapa diretamente
    return redirect(url_for('login'))

@app.route('/route/<method>/<support>/<call>/<disaster>')
def get_sar_route(method, support, call, disaster):
    try:
        algoritmo = calcular_dijkstra if method == 'dijkstra' else calcular_bfs

        rota_a, custo_a = algoritmo(GRAFO_ADJACENCIA, support, call)
        rota_b, custo_b = algoritmo(GRAFO_ADJACENCIA, call, disaster)

        caminho_final = rota_a + rota_b[1:]
        custo_total = custo_a + custo_b

        path_coords = [
            {"lat": DADOS_NOS[no]['lat'], "lng": DADOS_NOS[no]['lng']} 
            for no in caminho_final
        ]

        return jsonify({
            "path": path_coords,
            "total_cost": f"{custo_total:.2f} min" if method == "dijkstra" else f"{custo_total} conexões"
        })

    except Exception as e:
        return jsonify({"error": f"Falha no motor ATLAS: {str(e)}"}), 500

# ==========================================
# INICIALIZAÇÃO DO SERVIDOR
# ==========================================
if __name__ == '__main__':
    app.run(debug=True)
