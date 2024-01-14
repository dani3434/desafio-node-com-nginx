FROM nginx:latest

# Defina o fuso horário
RUN echo 'date > /etc/timezone' > /etc/timezone

# Crie o arquivo sources.list antes de executar o sed
RUN touch /etc/apt/sources.list

# Modifique o arquivo sources.list
RUN sed -i 's/deb.debian.org/mirror.debian.org/g' /etc/apt/sources.list

# Instale o pacote httpie diretamente
RUN apt-get update && apt-get install -y --no-install-recommends httpie

# Restaure a configuração original do sources.list
RUN sed -i 's/mirror.debian.org/deb.debian.org/g' /etc/apt/sources.list
