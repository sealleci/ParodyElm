import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import 'vant/es/toast/style'
import {
  Button,
  Row,
  Col,
  Cell,
  CellGroup,
  Image as VanImage,
  Tab,
  Tabs,
  Tag,
  Skeleton,
  Card,
  DropdownMenu,
  DropdownItem,
  Popup,
  Checkbox,
  CheckboxGroup,
  Stepper,
  TreeSelect,
  Empty,
  Field,
  Search,
  Loading,
  Rate
} from 'vant'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app
  .use(store)
  .use(router)
  .use(Button)
  .use(Row)
  .use(Col)
  .use(Cell)
  .use(CellGroup)
  .use(VanImage)
  .use(Tab)
  .use(Tabs)
  .use(Tag)
  .use(Skeleton)
  .use(Card)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Popup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Stepper)
  .use(TreeSelect)
  .use(Empty)
  .use(Field)
  .use(Search)
  .use(Loading)
  .use(Rate)
  .mount('#app')
