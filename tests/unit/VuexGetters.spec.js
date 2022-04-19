// import { createLocalVue, mount } from '@vue/test-utils';
// eslint-disable-next-line import/no-named-as-default
import { getters } from '../../src/store/modules/categories';

const exampleCategories = [
  [
    {
      id: 'A6PwgupsOqyYLyeWbzKk',
      revenues: false,
      text: 'Rozrywka',
      expenses: true,
      uid: 'ZXYnOG7Q0kabIHjLv6HnX0EVQZE2',
      icon: 'fa-solid fa-gamepad',
      color: '#FF9800FF',
    },
    {
      id: 'X0eYLmBjJ3P3izGBuTSA',
      expenses: false,
      color: '#F44336FF',
      uid: 'ZXYnOG7Q0kabIHjLv6HnX0EVQZE2',
      text: 'Samochód',
      icon: 'fa-solid fa-car',
      revenues: true,
    },
    {
      id: 'Yn5G155fMZCNmb0gTH9E',
      icon: 'fa-solid fa-laptop',
      text: 'Elektronika',
      color: '#9C27B0FF',
      revenues: false,
      uid: 'ZXYnOG7Q0kabIHjLv6HnX0EVQZE2',
      expenses: true,
    },
    {
      id: 'v5r57NFj9wAZ8sTWEfUE',
      revenues: true,
      icon: 'fa-solid fa-house',
      text: 'Mieszkanie',
      expenses: false,
      uid: 'global',
      color: '#2196F3FF',
    },
    {
      id: 'NhOshQYaIoVeNNWMC6fq',
      revenues: true,
      color: '#4CAF50',
      icon: 'fa-solid fa-briefcase',
      uid: 'global',
      text: 'Umowa o prace',
      expenses: true,
    },
  ],
];
const revenuesCorrectCategories = [
  {
    id: 'X0eYLmBjJ3P3izGBuTSA',
    expenses: false,
    color: '#F44336FF',
    uid: 'ZXYnOG7Q0kabIHjLv6HnX0EVQZE2',
    text: 'Samochód',
    icon: 'fa-solid fa-car',
    revenues: true,
  },
  {
    id: 'v5r57NFj9wAZ8sTWEfUE',
    revenues: true,
    icon: 'fa-solid fa-house',
    text: 'Mieszkanie',
    expenses: false,
    uid: 'global',
    color: '#2196F3FF',
  },
  {
    id: 'v5r57NFj9wAZ8sTWEfUE',
    revenues: true,
    icon: 'fa-solid fa-house',
    text: 'Mieszkanie',
    expenses: false,
    uid: 'global',
    color: '#2196F3FF',
  },
  {
    id: 'NhOshQYaIoVeNNWMC6fq',
    revenues: true,
    color: '#4CAF50',
    icon: 'fa-solid fa-briefcase',
    uid: 'global',
    text: 'Umowa o prace',
    expenses: true,
  },
];

const expensesCorrectCategories = [
  {
    id: 'A6PwgupsOqyYLyeWbzKk',
    revenues: false,
    text: 'Rozrywka',
    expenses: true,
    uid: 'ZXYnOG7Q0kabIHjLv6HnX0EVQZE2',
    icon: 'fa-solid fa-gamepad',
    color: '#FF9800FF',
  },
  {
    id: 'Yn5G155fMZCNmb0gTH9E',
    icon: 'fa-solid fa-laptop',
    text: 'Elektronika',
    color: '#9C27B0FF',
    revenues: false,
    uid: 'ZXYnOG7Q0kabIHjLv6HnX0EVQZE2',
    expenses: true,
  },
  {
    id: 'NhOshQYaIoVeNNWMC6fq',
    revenues: true,
    color: '#4CAF50',
    icon: 'fa-solid fa-briefcase',
    uid: 'global',
    text: 'Umowa o prace',
    expenses: true,
  },
];

console.log(categories);
describe('Vuex Categories module getters test', () => {
  test('Categories module => expensesCategories', () => {
    // mock state
    const state = {
      categories: exampleCategories,
    };
    const result = getters.expensesCategories(state);
    expect(result).toEqual(expensesCorrectCategories);
  });

  test('Categories module => revenuesCategories', () => {
    // mock state
    const state = {
      categories: exampleCategories,
    };
    const result = getters.revenuesCategories(state);
    expect(result).toEqual(revenuesCorrectCategories);
  });
});
