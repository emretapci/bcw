FROM ubuntu

EXPOSE 8545

RUN apt update -y && \
	apt install -y curl git nano && \
	curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh -o install_nvm.sh && \
	chmod +x install_nvm.sh && \
	./install_nvm.sh && \
	export NVM_DIR="$HOME/.nvm" && \
	[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
	[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" && \
	nvm install v14.17.5

RUN npm config set user 0 && \
	npm i -g ganache-cli

COPY startup.sh /startup.sh
RUN chmod +x startup.sh

CMD /startup.sh