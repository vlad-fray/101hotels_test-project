<template>
    <div class="meme-content">
        <p v-html="memes[currentMemeIndex]"></p>

        <div class="meme-actions">
            <p>{{ currentMemeIndex + 1 }} / {{ memes.length }}</p>

            <button
                type="button"
                class="meme-button"
                @click.stop="showNextMeme"
            >
                Next
            </button>
        </div>
    </div>  
</template>

<script>
const memes = [
    'Девушка: Ты уверен, что раньше занимался сексом?<br /><br /> Я: [пытаясь натянуть презерватив на одну из её сисек] Поверь мне',
    'Почему водитель Яндекс такси сидит на стуле с хуями?<br /><br /> Потому что час пик ещё не настал.',
    'Чем бутылка похожа на экзамен?<br /><br /> Нужно сначала посидеть подумать, а потом взять и сдать',
    'Почему гей пары часто распадаются?<br /><br /> Потому, что их отношения построены из говна и палок',
    'В семье богатых быдляков родилась дочь и ее назвали Постирония.<br /><br /> Её похитили и потребовали выкуп, но быдло не выкупает Постиронию',
    'Почему иллюзионисты братья Сафроновы ебут куртку?<br /><br /> Потому что у нее туз в рукаве﻿',
    'Мальчик: ебашится в приставку<br /><br /> Мужчина: ебашит приставов',
    'Что общего у человека, работащего на трёх работах и жадным барыгой?<br /><br /> Недосыпают',
    'Что случилось с игроком в покер, который отравился вокзальной шаурмой?<br /><br /> Блефанул на стол',
    'Как назвать Creampie по-русски?<br /><br /> Варенник с творогом',
    'Что общего у пасхального кулича и члена?<br /><br /> Если сгрызть верхушку, папа даст пизды',
    'Каждое утро я начинаю со свежевыжатого «сука надо было раньше ложиться»',
    'Видели как солевые наркоманы залипают объёбанные, запрокинув голову?<br /><br /> Вот у меня такое же от пельмешек',
    'Что делать, если отправил сына за картошкой, а его сбила машина?<br /><br /> Плов',
    'Я потратил два года на поиски убийцы своей бывшей девушки.<br /><br /> Но никто так и не согласился',
    'Как в Италии называют итальянцев со сломанной рукой? Люди с дефектом речи.',
    `Стоят на мосту Темзы два джентельмена и разговаривают. Тут в реке замечают
        человека, который кричит:<br /> 
        — Помогите, я не умею плавать, помогите, я не умею плавать!!!<br />
        — Джеймс, вы умеете плавать?<br />
        — Нет, а Вы, Уильям?<br />
        — Я тоже, но мы же не орем об этом на весь Лондон.`,
    'Ненавижу людей, которые пьют как свиньи, не зная меры. Вчера ночью мои друзья уронили меня три раза, пока несли до машины, алкаши @баные!',
    'Электрические скаты до изобретения электричества работали на угле и пару.',
    `В одном парке стояли две статуи, долго стояли, 100, 200 лет никто не знает. <br />
        Решил Бог смиловаться над ними, оживил их и говорит:<br />
        — У вас есть 15 мин. делайте что хотите.<br />
        Статуи взялись за руки и убежали в кусты,
        возвращаются через 10 минут счастливые.<br />
        Бог им:<br />
        — У вас есть еще пять минут<br />
        Статуи снова в кусты.<br />
        Решил Бог посмотреть, что они там делают,
        смотрит, статуи держат голубя, одна другой:<br />
        — Теперь ты его держи, я на него срать буду!`,
    'Штирлиц пришёл домой, достал из-под кровати радиостанцию и начал отбивать шифровку в центр.<br /><br /> Штирлиц не знал азбуки Морзе, но надеялся, что по радостному бибиканью на Родине поймут - задание партии выполнено!',
    'Общаются парень с девушкой:<br />- А ты довольно милая<br />- Спасибо)<br />- Ты как скобку выговорила?!',
    'Цыпленок бьётся головой о стену и говорит:<br /> - Позор! Какой позор!<br /> Пришла мама:<br /> - Сынок, в чем дело?<br /> - Мама, а правда, что мой папа петух?<br /> - Да, сынок.<br /> - Позор, какой позор!',
    '- Я приходил к вам по поводу похудения.<br />- Да. Помню, для начала, я советовал вам вставать с утра на зарядку. Как успехи?<br />- Я её раздавил...',
    `Умирает старый богатый корсиканец. Собралась семья, ждут, 
        кому же достанется наследство. По старой доброй корсиканской традиции 
        всё достанется самому ленивому.
        <br />Умирающий слабым голосом:
        <br />- Доминик, сын мой, подойди ко мне.
        <br />Доминик подходит.
        <br />- Сынок, представь, что ты сидишь и видишь, 
            как ветер гонит купюру в 500 франков. Что ты сделаешь?
        <br />- Ничего, папа. Зачем лишний раз утомляться?
        <br />- Золотые слова, мой мальчик, ступай.
        <br />- Паоло, подойди ко мне.
        <br />Паоло подошел.
        <br />- Паоло, обнаженная страстная красавица тянет к тебе руки. Что ты сделаешь?
        <br />- Не пошевелюсь. Зачем лишний раз напрягаться?
        <br />- Хорошо, ступай.
        <br />- Антонио, подойди
        <br />- Сам подойди`,
    'В полицеском участке:<br />- Кто таков будешь?<br />- Гот.<br />- Не понял, а почему в белом?<br />- Изварещенец',
    'На похоронах плохого человека люди кидали землю в ещё открытый гроб.',
];

export default {
    data() {
        return {
            currentMemeIndex: 0,
            memes: memes,
        };
    },
    methods: {
        showNextMeme() {
            this.currentMemeIndex = this.currentMemeIndex === this.memes.length -1 
                ? 0
                : this.currentMemeIndex + 1;
        },
    },
};
</script>

<style scoped>
.meme-content {
    width: 100%;
    max-width: 600px;
    max-height: 600px;
    padding: 16px;
    border-radius: 24px;
    background-color: #ffffff;
}

.meme-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>