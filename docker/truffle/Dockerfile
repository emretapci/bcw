FROM ubuntu

RUN apt update -y && \
	apt install -y curl git nano && \
	curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh -o install_nvm.sh && \
	chmod +x install_nvm.sh && \
	./install_nvm.sh && \
	export NVM_DIR="$HOME/.nvm" && \
	[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
	[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" && \
	nvm install v14.17.5

RUN npm i -g truffle && \
	git clone https://emretapci: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@github.com/emretapci/bcw-truffle && \
	cd bcw-truffle && \
	npm i

COPY ./truffle-config.js /bcw-truffle/truffle-config.js

CMD sleep 10 && truffle migrate