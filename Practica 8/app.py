from flask import Flask, render_template, jsonify

app=Flask(__name__)

usuarios = [
        { 'id': 1, 'nombre': 'Juan Pérez',  'correo': 'juan@gmail.com',  'estado': 'Activo'    },
        { 'id': 2, 'nombre': 'Ana Gómez',   'correo': 'ana@hotmail.com', 'estado': 'Pendiente' },
        { 'id': 3, 'nombre': 'Luis Torres',  'correo': 'luis@gmail.com',  'estado': 'Activo'    },
    ]

@app.route('/')
def inicio():
    
    return render_template('index.html',usuarios=usuarios)

@app.route('/acerca')
def acerca():
    return render_template('acerca.html')

@app.route('/api/usuarios')
def api_usuarios():
    return jsonify(usuarios)

@app.route('/api/usuarios/activos')
def api_usuarios_activos():
    activos = [u for u in usuarios if u['estado'] == 'Activo']
    return jsonify(activos)

@app.route("/sidebar")
def sidebar():
    return render_template('sidebar.html')

if __name__=='__main__':
    app.run(debug=True)