let right_answer = 0;
let wrong_answer = 0;
class Words {
    constructor() {
        this.link = 'assets/words.json';
        this.count = 0;
        return (async () => {
            this.words = await this.getWords();
            return this;
        })();
    }

    async getWords() {
        return fetchLocal(this.link)
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            });
    };

    updateChooseWord() {
        let chooses = ['word1', 'word2', 'word3'];
        let tmp_words = [...this.words];
        $('.custom-control-input').prop('checked', false);
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

    updateInputWord() {
        document.getElementById('main_input').value = '';
        let right_word = this.words[Math.floor(Math.random() * this.words.length)];
        let img = document.getElementById('main_img');
        img.src = right_word.path;
        img.setAttribute('word_name', right_word.name);
    }
};

checkChooseRightAnswer = (self) => {
    if (self.nextElementSibling.value === 'right'){
        alert('Правильный ответ');
        right_answer += 1;
    }
    else {
        alert('Не правильный ответ');
        wrong_answer += 1;
    }
    words.then(result => result.updateChooseWord());
};

checkInputRightAnswer = () => {
    if (document.getElementById('main_img').getAttribute('word_name') === document.getElementById('main_input').value.toLowerCase()){
        alert('Правильный ответ');
        right_answer += 1;
    }
    else {
        alert('Не правильный ответ');
        wrong_answer += 1;
    }
    words.then(result => result.updateInputWord());
};

showScore = () => {
    document.getElementById('right_answer').innerText = `Правильных ответов: ${right_answer}`;
    document.getElementById('wrong_answer').innerText = `Не правильных ответов: ${wrong_answer}`;
};



