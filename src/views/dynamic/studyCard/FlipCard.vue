<template>
  <div v-if="cardData">
    <div
      class="card-front flipcard-position flip-animation rela"
      :style="{ height: BASE_CARD_PARAMS.height }"
      :aria-hidden="flip"
      :class="{ 'is-flipped': flip }"
    >
      <nav class="card-option">
        <a-button @click="(e: Event) => onCopy(e, cardData.question)"
          ><template #icon> <CopyOutlined /> </template
        ></a-button>
        <ul class="ul_li-f">
          <li>
            <a-button @click="onEditCard">
              <template #icon>
                <EditFilled />
              </template>
            </a-button>
          </li>
          <li>
            <StarButton @click="onClickStar" v-model:value="cardData.set_favorite"></StarButton>
          </li>
        </ul>
      </nav>
      <div class="content-holder">
        <p class="text-content" ref="refsContent" :style="{ fontSize: '2em' }">
          {{ cardData.question }}
        </p>
      </div>
    </div>
    <div
      class="card-front flipcard-position flip-animation rela"
      :style="{ height: BASE_CARD_PARAMS.height }"
      :aria-hidden="!flip"
      :class="{ 'is-flipped2': !flip }"
    >
      <div>
        <nav class="card-option">
          <a-button @click="(e: Event) => onCopy(e, cardData.answer)"
            ><template #icon> <CopyOutlined /> </template
          ></a-button>
          <ul class="ul_li-f">
            <li>
              <a-button @click="onEditCard">
                <template #icon>
                  <EditFilled />
                </template>
              </a-button>
            </li>
            <li>
              <StarButton @click="onClickStar" v-model:value="cardData.set_favorite"></StarButton>
            </li>
          </ul>
        </nav>
        <div class="content-holder">
          <p class="text-content" ref="refsContent" :style="{ fontSize: '1.5em' }">
            {{ cardData.answer }}
          </p>
        </div>
      </div>
    </div>
    <template
      ><ModalEditCard
        v-model:modal-content="cardData"
        v-model:is-visible="isVisibleEditModal"
      ></ModalEditCard>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { EditFilled, CopyOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import ModalEditCard from './ModalEditCard.vue';
import StarButton from './StarButton.vue';
import { useStudyCard } from './store/useStudyCard';
type PropsType = {
  cardData: API.ICard;
  flip: boolean;
};
const { setCardFavorite } = useStudyCard();
const props = defineProps<PropsType>();
const isVisibleEditModal = ref(false);
const refsContent = ref<HTMLElement>();

const { cardData, flip } = toRefs(props);

const BASE_CARD_PARAMS = readonly({
  fontSize: '2em',
  height: '28.125em',
});
const onClickStar = (e: Event) => {
  e.stopPropagation();
  setCardFavorite({ id: cardData.value.id, set_favorite: cardData.value.set_favorite });
};
const onEditCard = (e: Event) => {
  e.stopPropagation();
  isVisibleEditModal.value = true;
};
const onCopy = (e: Event, value: string) => {
  e.stopPropagation();
  navigator.clipboard.writeText(value);
  message.success({ content: 'Copied', duration: 1 });
};
</script>
<style scoped lang="less">
.rela {
  border-radius: 15px;
  box-shadow: 0 0.25rem 1rem 0 #2e385614;
  height: 28.125em;
  text-align: center;
  background-color: white;
  padding: 1.5em;
  overflow: hidden;
}
.card-option {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ul {
    display: flex;
    gap: 0.625em;
  }
}
.content-holder {
  padding: 0.5em 0;
  max-height: 21.875em;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .text-content {
    white-space: break-spaces;
    font-size: 2em;
    align-self: center;
    max-height: 13em;
  }
}

.flipcard-position {
  position: absolute;
  right: 0;
  left: 0;
}
.flip-animation {
  transition: transform 0.3s;
  transform-style: preserve-3d;
}

.card-front {
  backface-visibility: hidden;
  overflow: hidden;
}
.is-flipped {
  transform: rotateX(180deg);
}
.is-flipped2 {
  transform: rotateX(-180deg);
}
</style>
