<template>
    <aside class="meme-wrapper">
        <backdrop-modal v-if="isMemeModalShown" @close-modal="isMemeModalShown = false" >
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
        </backdrop-modal>

        <button
            type="button"
            :class="[
                'meme-button',
                !isMemeModalShown && 'meme-button_ring',
            ]"
            @click="isMemeModalShown = !isMemeModalShown"
        >
            Click me
        </button>
    </aside>
</template>

<script>
import BackdropModal from '../layouts/BackdropModal.vue';

const memes = [
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
    components: { BackdropModal },
    data() {
        return {
            isMemeModalShown: false,
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
.meme-wrapper {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    z-index: 10;
}

.meme-modal {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    height: 100vh;
    width: 100vw;
    background-color: #00000011;
}

.meme-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.meme-button {
    color: #ffffff;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    background-color: var(--color-primary);
    border: none;
    cursor: pointer;
}

.meme-button:hover {
    background-color: var(--color-primary-hover);
}

.meme-button_ring {
    box-shadow: 12px 12px 24px var(--color-primary);
}

.meme-button_ring::after {
    content: '';
    width: 30px; height: 30px;
    border-radius: 100%;
    border: 6px solid var(--color-primary);
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ring 1.5s infinite;
}

.meme-content {
    width: 100%;
    max-width: 600px;
    max-height: 600px;
    padding: 16px;
    border-radius: 24px;
    background-color: #ffffff;
}

@keyframes ring {
    0% {
        width: 30px;
        height: 30px;
        opacity: 1;
    }
    100% {
        width: 150px;
        height: 150px;
        opacity: 0;
    }
}
</style>