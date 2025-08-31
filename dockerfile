# docker build -t bakalarka .
# docker run -p 8000:8000 bakalarka


# Použij Python 3.11
FROM python:3.11

# Nastav pracovní složku uvnitř kontejneru
WORKDIR /app

# Zkopíruj requirements z tvé projektové složky
COPY requirements.txt .

# Nainstaluj závislosti
RUN pip install --no-cache-dir -r requirements.txt

# Zkopíruj celý projekt do kontejneru
COPY coq_blocks/ ./coq_blocks

# nastavení pracovního adresáře pro Django
WORKDIR /app/coq_blocks

# Výchozí příkaz pro spuštění Django serveru
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
