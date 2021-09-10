FROM nginx

RUN apt update -y && \
	apt install -y nano

COPY nginx.conf /etc/nginx/nginx.conf
COPY 173.249.57.83_81.conf /etc/nginx/sites-enabled/173.249.57.83:81.conf
