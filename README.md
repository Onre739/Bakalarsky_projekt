## COQ Definition Maker (Bakalářská práce)
Tato aplikace slouží k vizuální tvorbě a manipulaci s definicemi pro Coq Proof Assistant pomocí blokového schématu. Projekt je postaven na frameworku Django a pro parsování Coq kódu využívá ANTLR4.

### Spouštění přes Docker:
1. git clone https://github.com/Onre739/Bakalarsky_projekt.git
2. cd coq-blocks
3. docker build -t coq-blocks-app .
4. docker run -p 8000:8000 coq-blocks-app
5. V prohlížeči: http://localhost:8000

### Lokální spuštění (Vývoj)
1. Tvorba virtuální prostředí + aktivace 
  - python -m venv coq_blocks_env
  - .\coq_blocks_env\Scripts\activate

2. Instalace závislostí:
  - pip install -r requirements.txt

3. Spouštění Django serveru:
  - cd coq_blocks
  - python manage.py runserver

4. Prohlížeč: http://localhost:8000

### ANTLR (Generování parseru)
- Projekt využívá ANTLR4 pro parsování vstupů.
- Gramatika se nachází v coq_blocks/antlr/COQ.g4.
- Pokud upravíte gramatiku, je potřeba přegenerovat Python soubory:
- Je potřeba nainstalovaný antlr4-tools (je součástí requirements.txt).

Spusťte generování:
1. cd coq_blocks/antlr
2. antlr4 -Dlanguage=Python3 -visitor COQ.g4

### 📂 Struktura projektu
- coq_blocks/ - Hlavní Django projekt.
- web_coq_blocks/ - Django aplikace (views, urls, static soubory).
  - JS komponenty
- antlr/ - Gramatika a vygenerované parsovací soubory.
- BlockClasses.py - Definice Python tříd pro reprezentaci bloků.

