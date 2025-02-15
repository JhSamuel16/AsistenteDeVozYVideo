from flask import Flask, request, jsonify
from flask_cors import CORS
#import openai
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Esto habilita CORS para todas las rutas

# Clave API OpenAI
#openai.api_key = "TU_CLAVE_API"


model = genai.GenerativeModel("gemini-pro")
# Clave API de Google
genai.configure(api_key="TU_CLAVE_API")

@app.route("/ask", methods=["POST"])
def ask_assistant():
    data = request.get_json()
    question = data.get("question")
    
    # Usando OpenAI
    #response = openai.Completion.create(model="text-davinci-003", prompt=question, max_tokens=150)
    #return jsonify({"response": response["choices"][0]["text"].strip()})

    
    # Usando Gemini
    try:
        # Generar la respuesta
        # response = genai.generate(model="text-bison-001", prompt=question, max_output_tokens=150)
        response = model.generate_content(question)
        
        # Extraer el texto de la respuesta
        # assistant_reply = response["candidates"][0]["output"]  # Ajusta según el formato exacto
        assistant_reply = response.text
        
        return jsonify({"response": assistant_reply})
    except Exception as e:
        print(f"Error al generar la respuesta: {e}")
        return jsonify({"response": "Hubo un error al conectar con el asistente."}), 500


if __name__ == "__main__":
    app.run(debug=True)