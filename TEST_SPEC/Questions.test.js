import React from 'react';
import renderer, {
  screen, act, render, fireEvent, waitFor, within,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { toHaveTextContent } from '@testing-library/jest-dom';
import axiosMock from 'axios';

import Questions from '../client/src/components/Questions.jsx';
import Question from '../client/src/components/QuestionsComp/Question.jsx';
import QuestionsList from '../client/src/components/QuestionsComp/QuestionsList.jsx';
import Answer from '../client/src/components/QuestionsComp/Answer.jsx';
import AnswersList from '../client/src/components/QuestionsComp/AnswersList.jsx';

// console.log(App);
const question = {
  question_id: 644307,
  question_body: 'Honk :o)',
  question_date: '2022-12-08T00:00:00.000Z',
  asker_name: 'Honk :o)',
  question_helpfulness: 77,
  reported: false,
  answers: {
    5989532: {
      id: 5989532,
      body: 'Honk :o)',
      date: '2022-12-08T00:00:00.000Z',
      answerer_name: 'Honk :o)',
      helpfulness: 39,
      photos: [
        '1PDVD_013.jpeg',
      ],
    },
    5989680: {
      id: 5989680,
      body: 'THE GREAT HONKENING IS UPON US MORTALS! SUBMIT TO ME OR PERISH! IT IS YOUR DESTINY AND YOU SHALL NOT ESCAPE IT!',
      date: '2022-12-11T00:00:00.000Z',
      answerer_name: 'Honk :o)',
      helpfulness: 10,
      photos: [],
    },
    5989648: {
      id: 5989680,
      body: 'THE GREAT HONKENING IS UPON US MORTALS! SUBMIT TO ME OR PeerRISH! IT IS YOUR DESTINY AND YOU SHALL NOT ESCAPE IT!',
      date: '2022-13-11T00:00:00.000Z',
      answerer_name: 'Hqnk :o)',
      helpfulness: 11,
      photos: [],
    },
  },
};
const product = {
  id: 40346,
  campus: 'hr-rfp',
  name: 'Morning Joggers',
  slogan: 'Make yourself a morning person',
  description: "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
  category: 'Pants',
  default_price: '40.00',
  created_at: '2021-08-13T14:38:44.509Z',
  updated_at: '2021-08-13T14:38:44.509Z',
  features: [
    {
      feature: 'Fabric',
      value: '100% Cotton',
    },
    {
      feature: 'Cut',
      value: 'Skinny',
    },
  ],
};
const questions = [
  {
    question_id: 642632,
    question_body: 'Why?',
    question_date: '2022-08-01T00:00:00.000Z',
    asker_name: 'jack',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 642078,
    question_body: 'this is broken 1155',
    question_date: '2022-07-16T00:00:00.000Z',
    asker_name: 'postman2',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 642077,
    question_body: 'Why do this hang?',
    question_date: '2022-07-16T00:00:00.000Z',
    asker_name: 'AFatRagdoll',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 642075,
    question_body: 'test from postman 1142',
    question_date: '2022-07-16T00:00:00.000Z',
    asker_name: 'postman',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 642054,
    question_body: 'should only download 6 questions',
    question_date: '2022-07-16T00:00:00.000Z',
    asker_name: 'test',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 642053,
    question_body: 'Comfortable!!!!',
    question_date: '2022-07-16T00:00:00.000Z',
    asker_name: 'comfy',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 642051,
    question_body: 'teseting a question',
    question_date: '2022-07-16T00:00:00.000Z',
    asker_name: 'test',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 642050,
    question_body: "if i add a question, there should be 45 q's now?",
    question_date: '2022-07-16T00:00:00.000Z',
    asker_name: 'test',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 642024,
    question_body: 'last of the night 1106',
    question_date: '2022-07-16T00:00:00.000Z',
    asker_name: 'nighttester',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 642022,
    question_body: 'test',
    question_date: '2022-07-16T00:00:00.000Z',
    asker_name: 'tester',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986538: {
        id: 5986538,
        body: 'test2',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test2',
        helpfulness: 1,
        photos: [],
      },
    },
  },
  {
    question_id: 642020,
    question_body: 'this is another question',
    question_date: '2022-07-16T00:00:00.000Z',
    asker_name: '24',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 642018,
    question_body: 'Where did it diverge from expected results?',
    question_date: '2022-07-16T00:00:00.000Z',
    asker_name: 'Debugger',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 641844,
    question_body: 'a question exists',
    question_date: '2022-07-12T00:00:00.000Z',
    asker_name: 'existing',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 641843,
    question_body: 'testq',
    question_date: '2022-07-12T00:00:00.000Z',
    asker_name: 'qtest',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 641842,
    question_body: 'this is a test',
    question_date: '2022-07-12T00:00:00.000Z',
    asker_name: 'testing',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 641841,
    question_body: 'This is a test.',
    question_date: '2022-07-12T00:00:00.000Z',
    asker_name: 'jack',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986542: {
        id: 5986542,
        body: 'another one?',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 641839,
    question_body: 'this is a test',
    question_date: '2022-07-12T00:00:00.000Z',
    asker_name: 'jack ',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 641838,
    question_body: 'This is a test',
    question_date: '2022-07-12T00:00:00.000Z',
    asker_name: 'jack',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 641834,
    question_body: 'When do the new stock come out?',
    question_date: '2022-07-12T00:00:00.000Z',
    asker_name: 'stocker',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 641833,
    question_body: 'How do you wash it?',
    question_date: '2022-07-12T00:00:00.000Z',
    asker_name: 'washer',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 641832,
    question_body: 'How do I buy it?',
    question_date: '2022-07-12T00:00:00.000Z',
    asker_name: 'buyer2',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 641831,
    question_body: 'How do I buy it?',
    question_date: '2022-07-12T00:00:00.000Z',
    asker_name: 'buyer',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986545: {
        id: 5986545,
        body: 'online!',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'Seller',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 641830,
    question_body: 'north bayou',
    question_date: '2022-07-12T00:00:00.000Z',
    asker_name: 'bayou',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 641829,
    question_body: 'Dukabel cables',
    question_date: '2022-07-12T00:00:00.000Z',
    asker_name: 'cables',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 641778,
    question_body: 'another test question',
    question_date: '2022-07-11T00:00:00.000Z',
    asker_name: 'hopeful',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986536: {
        id: 5986536,
        body: 'another one',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 1,
        photos: [],
      },
      5986574: {
        id: 5986574,
        body: 'another two',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 641777,
    question_body: 'testing question',
    question_date: '2022-07-11T00:00:00.000Z',
    asker_name: 'test',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986465: {
        id: 5986465,
        body: 'i can see it!',
        date: '2022-07-16T00:00:00.000Z',
        answerer_name: 'tester',
        helpfulness: 0,
        photos: [],
      },
      5986546: {
        id: 5986546,
        body: 'i cannot see it!',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 641775,
    question_body: 'test question',
    question_date: '2022-07-11T00:00:00.000Z',
    asker_name: 'Seller',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 641771,
    question_body: 'test from postman',
    question_date: '2022-07-11T00:00:00.000Z',
    asker_name: 'postman',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 641765,
    question_body: 'test question',
    question_date: '2022-07-11T00:00:00.000Z',
    asker_name: 'tester',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 640905,
    question_body: 'still not working?',
    question_date: '2022-05-24T00:00:00.000Z',
    asker_name: 'ddfd',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986575: {
        id: 5986575,
        body: 'testimage',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 0,
        photos: [
          'https://res.cloudinary.com/drf3dli0i/image/upload/v1658071614/y9nbtbmjkgw293ynihzo.jpg',
          'https://res.cloudinary.com/drf3dli0i/image/upload/v1658071615/o39rcw2kshs1tcd1krut.webp',
        ],
      },
    },
  },
  {
    question_id: 593217,
    question_body: 'qrqoij`',
    question_date: '2022-04-14T00:00:00.000Z',
    asker_name: 'dlkj',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 573540,
    question_body: 'Where Is the chainmail?',
    question_date: '2022-02-22T00:00:00.000Z',
    asker_name: 'Din',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 426689,
    question_body: 'Testing',
    question_date: '2021-10-09T00:00:00.000Z',
    asker_name: 'Test',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986567: {
        id: 5986567,
        body: 'Testing123',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 426484,
    question_body: 'eeeeee????',
    question_date: '2021-09-24T00:00:00.000Z',
    asker_name: 'asdfasdf',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 426128,
    question_body: 'yes?',
    question_date: '2021-09-18T00:00:00.000Z',
    asker_name: 'maple',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986525: {
        id: 5986525,
        body: 'yes',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'yes',
        helpfulness: 0,
        photos: [],
      },
      5986530: {
        id: 5986530,
        body: 'no:D',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 426120,
    question_body: 'yes?',
    question_date: '2021-09-18T00:00:00.000Z',
    asker_name: 'maoxu',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 426119,
    question_body: 'yes?',
    question_date: '2021-09-18T00:00:00.000Z',
    asker_name: '123',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 426118,
    question_body: 'yes?',
    question_date: '2021-09-18T00:00:00.000Z',
    asker_name: '123',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 426098,
    question_body: 'who let the cats out?',
    question_date: '2021-09-18T00:00:00.000Z',
    asker_name: 'jonathan',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 426054,
    question_body: 'who let the dogs out?',
    question_date: '2021-09-17T00:00:00.000Z',
    asker_name: 'rhoadssssss',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986084: {
        id: 5986084,
        body: 'Woof woof woof woof woof.',
        date: '2022-07-11T00:00:00.000Z',
        answerer_name: 'dog',
        helpfulness: 1,
        photos: [],
      },
      5986177: {
        id: 5986177,
        body: 'dogs!?',
        date: '2022-07-13T00:00:00.000Z',
        answerer_name: 'dog',
        helpfulness: 0,
        photos: [],
      },
      5986526: {
        id: 5986526,
        body: 'test',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 426050,
    question_body: 'awesome, but how much',
    question_date: '2021-09-17T00:00:00.000Z',
    asker_name: 'willsmith',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986073: {
        id: 5986073,
        body: 'Its $79.99',
        date: '2022-07-10T00:00:00.000Z',
        answerer_name: 'Seller',
        helpfulness: 1,
        photos: [
          'https://res.cloudinary.com/drf3dli0i/image/upload/v1657492451/epqbykxgn4zp8myj4383.jpg',
        ],
      },
      5986478: {
        id: 5986478,
        body: 'test',
        date: '2022-07-16T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 0,
        photos: [],
      },
      5986480: {
        id: 5986480,
        body: 'i like pink',
        date: '2022-07-16T00:00:00.000Z',
        answerer_name: 'pink',
        helpfulness: 0,
        photos: [],
      },
      5986520: {
        id: 5986520,
        body: 'that looks great',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'great',
        helpfulness: 0,
        photos: [],
      },
      5986532: {
        id: 5986532,
        body: 'test',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'yes',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 426048,
    question_body: 'awesome, but how much',
    question_date: '2021-09-17T00:00:00.000Z',
    asker_name: 'willsmith',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986386: {
        id: 5986386,
        body: '$79.99',
        date: '2022-07-16T00:00:00.000Z',
        answerer_name: 'Seller',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 426034,
    question_body: 'how comfortable is it?',
    question_date: '2021-09-17T00:00:00.000Z',
    asker_name: 'willsmith',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986500: {
        id: 5986500,
        body: 'Yes',
        date: '2022-07-16T00:00:00.000Z',
        answerer_name: 'yesman',
        helpfulness: 0,
        photos: [],
      },
      5986551: {
        id: 5986551,
        body: 'very',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 0,
        photos: [
          'https://res.cloudinary.com/drf3dli0i/image/upload/v1658023411/hwsq4eqvp4w9wvyy3bmd.webp',
        ],
      },
    },
  },
  {
    question_id: 425961,
    question_body: 'fd',
    question_date: '2021-09-16T00:00:00.000Z',
    asker_name: 'f',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 425960,
    question_body: 'dsd',
    question_date: '2021-09-16T00:00:00.000Z',
    asker_name: 'dsd',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
  {
    question_id: 425959,
    question_body: 'fdf',
    question_date: '2021-09-16T00:00:00.000Z',
    asker_name: 'fdfd',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986069: {
        id: 5986069,
        body: 'Comfortable!',
        date: '2022-07-10T00:00:00.000Z',
        answerer_name: 'comf',
        helpfulness: 4,
        photos: [
          'https://res.cloudinary.com/drf3dli0i/image/upload/v1657491321/fte9thf715kpci8i3mt5.jpg',
        ],
      },
      5986519: {
        id: 5986519,
        body: 'love it',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 1,
        photos: [],
      },
    },
  },
  {
    question_id: 425958,
    question_body: 'Hey!',
    question_date: '2021-09-16T00:00:00.000Z',
    asker_name: 'z',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986499: {
        id: 5986499,
        body: 'Hi!',
        date: '2022-07-16T00:00:00.000Z',
        answerer_name: 'hiya',
        helpfulness: 1,
        photos: [],
      },
    },
  },
  {
    question_id: 425957,
    question_body: 'Hello',
    question_date: '2021-09-16T00:00:00.000Z',
    asker_name: 'z',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986381: {
        id: 5986381,
        body: 'Hi',
        date: '2022-07-16T00:00:00.000Z',
        answerer_name: 'greeter',
        helpfulness: 0,
        photos: [],
      },
      5986543: {
        id: 5986543,
        body: 'hola',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 425942,
    question_body: 'What is?',
    question_date: '2021-09-16T00:00:00.000Z',
    asker_name: 'Jan',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986379: {
        id: 5986379,
        body: 'What is life?',
        date: '2022-07-16T00:00:00.000Z',
        answerer_name: 'existentialist',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 425941,
    question_body: 'Is it cold?',
    question_date: '2021-09-16T00:00:00.000Z',
    asker_name: 'woopwoop',
    question_helpfulness: 0,
    reported: false,
    answers: {
      5986071: {
        id: 5986071,
        body: 'It is not!',
        date: '2022-07-10T00:00:00.000Z',
        answerer_name: 'Nike',
        helpfulness: 1,
        photos: [
          'https://res.cloudinary.com/drf3dli0i/image/upload/v1657492023/zhsujuf6izspbvcq8bwk.jpg',
        ],
      },
      5986507: {
        id: 5986507,
        body: 'Nice joggers!',
        date: '2022-07-16T00:00:00.000Z',
        answerer_name: 'jogging',
        helpfulness: 0,
        photos: [],
      },
      5986508: {
        id: 5986508,
        body: 'Looks very thin!',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 0,
        photos: [],
      },
      5986509: {
        id: 5986509,
        body: 'Is it breathable?',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'testqr',
        helpfulness: 0,
        photos: [],
      },
      5986513: {
        id: 5986513,
        body: 'beautiful!',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'test',
        helpfulness: 0,
        photos: [
          'https://res.cloudinary.com/drf3dli0i/image/upload/v1658016746/gbwwwydkzg5dlfh2nlwe.webp',
        ],
      },
      5986535: {
        id: 5986535,
        body: 'test0627',
        date: '2022-07-17T00:00:00.000Z',
        answerer_name: 'teset0627',
        helpfulness: 0,
        photos: [],
      },
    },
  },
  {
    question_id: 425938,
    question_body: 'Does it break down in the wash? ',
    question_date: '2021-09-15T00:00:00.000Z',
    asker_name: 'Meowrah Carey',
    question_helpfulness: 0,
    reported: false,
    answers: {},
  },
];

describe('Questions & Answers', () => {
  it('should display question body', async () => {
    const { getByTestId } = render(<Question question={question} />);
    expect(getByTestId('question')).toHaveTextContent('Honk');
  });

  it('should not display question body after clicking collpase', async () => {
    const { getByTestId, queryByTestId } = render(<Questions product={product} />);
    fireEvent.click(queryByTestId('expand-collapse'));
    expect(queryByTestId('question-list')).not.toBeVisible();
  });

  it('should see question list after clicking collapse/expand twice', async () => {
    const { getByTestId, queryByTestId } = render(<Questions product={product} />);
    fireEvent.click(queryByTestId('expand-collapse'));
    fireEvent.click(queryByTestId('expand-collapse'));
    expect(queryByTestId('question-list')).toBeInTheDocument();
  });

  it('should see thanks for feedback after clicking collapse/expand twice', async () => {
    const { getByTestId, queryByTestId } = render(<Question question={question} />);
    fireEvent.click(queryByTestId('helpful-question-button'));
    expect(getByTestId('helpful-question-button-feedback')).toBeVisible();
  });

  it('should disable button after clicking report button', async () => {
    const { getByTestId, queryByTestId } = render(<Question question={question} />);
    fireEvent.click(queryByTestId('report-question-button'));
    expect(queryByTestId('report-question-button-feedback')).toHaveTextContent('Reported');
  });

  it('should render answer body', async () => {
    const { queryByTestId } = render(<Answer answer={question.answers[5989532]} allAnswers={question.answers} />);
    expect(queryByTestId('answer-body')).toHaveTextContent('Honk :o)');
  });

  it('should change help button to message', async () => {
    const { getByTestId, queryByTestId } = await render(<Answer answer={question.answers[5989532]} allAnswers={question.answers} />);
    fireEvent.click(queryByTestId('helpful-button'));
    expect(queryByTestId('helpful-button-feedback')).toHaveTextContent('Thanks for the feedback');
  });

  it('should change report button to a message', async () => {
    const { getByTestId, queryByTestId } = await render(<Answer answer={question.answers[5989532]} allAnswers={question.answers} />);
    fireEvent.click(queryByTestId('answer-report-button'));
    expect(queryByTestId('report-button-feedback')).toHaveTextContent('Reported');
  });

});