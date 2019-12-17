class Words {
    constructor() {
        this.link = 'assets/words.json';
        this.count = 0;
        return (async () => {
            this.words = await this.getWords();
            this.cur_word = this.updateWord();
            return this;
        })();
    }

    async getWords() {
        return fetch(this.link)
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            });
    };

    updateWord() {
        let chooses = ['word1', 'word2', 'word3'];
        let tmp_words = [...this.words];
        for (let choose of chooses){
            let len = tmp_words.length;
            let word = Math.floor(Math.random() * parseInt(len));
            document.getElementById(choose).innerText = tmp_words[word].name;
            document.getElementById(choose).value = '';
            tmp_words.splice(word, 1);
        }
        let right_choose = chooses[Math.floor(Math.random() * chooses.length)];
        let right_el = document.getElementById(right_choose);
        right_el.value = 'right';
        let right_word = this.words.filter(word => word.name === right_el.innerText)[0];
        document.getElementById('main_img').src = right_word.path;
    };
};

let words = new Words();

function getRightAnswer(self) {
    if (self.nextElementSibling.value === 'right'){
        alert('Правильный ответ');
    }
    else {
        alert('Не правильный ответ');
    }
    words.then(result => result.updateWord());
}




