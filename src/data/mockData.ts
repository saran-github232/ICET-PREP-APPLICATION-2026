import type { Question } from '../types';

export const MOCK_QUESTIONS: Question[] = [
  // Analytical Ability
  {
    id: 'm1',
    number: 1,
    section: 'Analytical',
    text: 'Find the missing number in the sequence: 4, 9, 16, 25, 36, ?',
    options: [{id: 'A', text: '47'}, {id: 'B', text: '49'}, {id: 'C', text: '52'}, {id: 'D', text: '64'}],
    correctAnswer: 'B'
  },
  {
    id: 'm2',
    number: 2,
    section: 'Analytical',
    text: 'If FRIEND is coded as HUMJTK, how is CANDLE coded?',
    options: [{id: 'A', text: 'EDRIRL'}, {id: 'B', text: 'DCQHQK'}, {id: 'C', text: 'ESJFME'}, {id: 'D', text: 'FYOBOC'}],
    correctAnswer: 'A'
  },
  {
    id: 'm3',
    number: 3,
    section: 'Analytical',
    text: 'Pointing to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph was it?',
    options: [{id: 'A', text: 'His own'}, {id: 'B', text: 'His father\'s'}, {id: 'C', text: 'His son\'s'}, {id: 'D', text: 'His nephew\'s'}],
    correctAnswer: 'C'
  },
  {
    id: 'm4',
    number: 4,
    section: 'Analytical',
    text: 'A, B, C, D and E are sitting on a bench. A is sitting next to B, C is sitting next to D, D is not sitting with E who is on the left end of the bench. C is on the second position from the right. A is to the right of B and E. A and C are sitting together. In which position A is sitting?',
    options: [{id: 'A', text: 'Between B and D'}, {id: 'B', text: 'Between B and C'}, {id: 'C', text: 'Between E and D'}, {id: 'D', text: 'Between C and E'}],
    correctAnswer: 'B'
  },
  // Mathematical Ability
  {
    id: 'm5',
    number: 5,
    section: 'Mathematical',
    text: 'The average of first five multiples of 3 is:',
    options: [{id: 'A', text: '3'}, {id: 'B', text: '9'}, {id: 'C', text: '12'}, {id: 'D', text: '15'}],
    correctAnswer: 'B'
  },
  {
    id: 'm6',
    number: 6,
    section: 'Mathematical',
    text: 'If 20% of a = b, then b% of 20 is the same as:',
    options: [{id: 'A', text: '4% of a'}, {id: 'B', text: '5% of a'}, {id: 'C', text: '20% of a'}, {id: 'D', text: 'None of these'}],
    correctAnswer: 'A'
  },
  // More questions following the pattern...
  {
    id: 'm7',
    number: 7,
    section: 'Analytical',
    text: 'Complete the series: SCD, TEF, UGH, ____, WKL',
    options: [{id: 'A', text: 'CMN'}, {id: 'B', text: 'UJI'}, {id: 'C', text: 'VIJ'}, {id: 'D', text: 'IJT'}],
    correctAnswer: 'C'
  },
  {
    id: 'm8',
    number: 8,
    section: 'Communication',
    text: 'Choose the correctly spelled word:',
    options: [{id: 'A', text: 'Accomodate'}, {id: 'B', text: 'Accommodate'}, {id: 'C', text: 'Acomodate'}, {id: 'D', text: 'Accommadate'}],
    correctAnswer: 'B'
  },
  {
    id: 'm9',
    number: 9,
    section: 'Mathematical',
    text: 'A train 120m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds. The speed of the train is:',
    options: [{id: 'A', text: '43.2 km/hr'}, {id: 'B', text: '48.2 km/hr'}, {id: 'C', text: '50 km/hr'}, {id: 'D', text: '54 km/hr'}],
    correctAnswer: 'B'
  },
  {
    id: 'm10',
    number: 10,
    section: 'Analytical',
    text: 'In a certain code, "786" means "study very hard", "958" means "hard work pays" and "645" means "study and work". Which of the following is the code for "very"?',
    options: [{id: 'A', text: '8'}, {id: 'B', text: '6'}, {id: 'C', text: '7'}, {id: 'D', text: 'Cannot be determined'}],
    correctAnswer: 'C'
  },
  {
    id: 'm11',
    number: 11,
    section: 'Analytical',
    text: 'Find the odd one out:',
    options: [{id: 'A', text: 'January'}, {id: 'B', text: 'May'}, {id: 'C', text: 'July'}, {id: 'D', text: 'November'}],
    correctAnswer: 'D'
  },
  {
    id: 'm12',
    number: 12,
    section: 'Mathematical',
    text: 'Find the HCF of 2/3, 8/9, 64/81, and 10/27:',
    options: [{id: 'A', text: '2/81'}, {id: 'B', text: '3/81'}, {id: 'C', text: '2/3'}, {id: 'D', text: '8/27'}],
    correctAnswer: 'A'
  },
  {
    id: 'm13',
    number: 13,
    section: 'Communication',
    text: 'Select the synonym for "ABANDON":',
    options: [{id: 'A', text: 'Keep'}, {id: 'B', text: 'Forsake'}, {id: 'C', text: 'Cherish'}, {id: 'D', text: 'Enlarge'}],
    correctAnswer: 'B'
  },
  {
    id: 'm14',
    number: 14,
    section: 'Analytical',
    text: 'If LIGHT is coded as MJHIT, how is DARK coded?',
    options: [{id: 'A', text: 'EBSL'}, {id: 'B', text: 'EBSM'}, {id: 'C', text: 'ECSL'}, {id: 'D', text: 'CBSL'}],
    correctAnswer: 'A'
  },
  {
    id: 'm15',
    number: 15,
    section: 'Mathematical',
    text: 'What will be the day of the week on 15th August 2026?',
    options: [{id: 'A', text: 'Friday'}, {id: 'B', text: 'Saturday'}, {id: 'C', text: 'Sunday'}, {id: 'D', text: 'Monday'}],
    correctAnswer: 'B'
  },
  {
    id: 'm16',
    number: 16,
    section: 'Analytical',
    text: 'Six persons A, B, C, D, E and F are standing in a circle. B is between F and C; A is between E and D; F is to the left of D. Who is between A and F?',
    options: [{id: 'A', text: 'B'}, {id: 'B', text: 'C'}, {id: 'C', text: 'D'}, {id: 'D', text: 'E'}],
    correctAnswer: 'C'
  },
  {
    id: 'm17',
    number: 17,
    section: 'Mathematical',
    text: 'The ratio of ages of A and B is 3:4. After 10 years, the ratio becomes 4:5. What is the current age of A?',
    options: [{id: 'A', text: '20'}, {id: 'B', text: '30'}, {id: 'C', text: '40'}, {id: 'D', text: '50'}],
    correctAnswer: 'B'
  },
  {
    id: 'm18',
    number: 18,
    section: 'Communication',
    text: 'Fill in the blank: Neither of the two boys ____ done their homework.',
    options: [{id: 'A', text: 'has'}, {id: 'B', text: 'have'}, {id: 'C', text: 'is'}, {id: 'D', text: 'are'}],
    correctAnswer: 'A'
  },
  {
    id: 'm19',
    number: 19,
    section: 'Analytical',
    text: 'If day after tomorrow is Saturday, what day was three days before yesterday?',
    options: [{id: 'A', text: 'Sunday'}, {id: 'B', text: 'Monday'}, {id: 'C', text: 'Tuesday'}, {id: 'D', text: 'Wednesday'}],
    correctAnswer: 'A'
  },
  {
    id: 'm20',
    number: 20,
    section: 'Mathematical',
    text: 'What is 15% of 200?',
    options: [{id: 'A', text: '20'}, {id: 'B', text: '25'}, {id: 'C', text: '30'}, {id: 'D', text: '35'}],
    correctAnswer: 'C'
  },
  {
    id: 'm21',
    number: 21,
    section: 'Analytical',
    text: 'Which one of the following words cannot be formed from the word "RECREATION"?',
    options: [{id: 'A', text: 'ACTION'}, {id: 'B', text: 'CREATE'}, {id: 'C', text: 'RETAIN'}, {id: 'D', text: 'NATION'}],
    correctAnswer: 'D'
  },
  {
    id: 'm22',
    number: 22,
    section: 'Mathematical',
    text: 'The price of an item decreased by 20% and then increased by 20%. The net change in price is:',
    options: [{id: 'A', text: 'No change'}, {id: 'B', text: '4% increase'}, {id: 'C', text: '4% decrease'}, {id: 'D', text: '1% decrease'}],
    correctAnswer: 'C'
  },
  {
    id: 'm23',
    number: 23,
    section: 'Communication',
    text: 'Identify the antonym for "DORMANT":',
    options: [{id: 'A', text: 'Inactive'}, {id: 'B', text: 'Active'}, {id: 'C', text: 'Sleepy'}, {id: 'D', text: 'Hidden'}],
    correctAnswer: 'B'
  },
  {
    id: 'm24',
    number: 24,
    section: 'Analytical',
    text: 'If 1st January 2024 was Monday, what day will it be on 1st January 2025?',
    options: [{id: 'A', text: 'Tuesday'}, {id: 'B', text: 'Wednesday'}, {id: 'C', text: 'Thursday'}, {id: 'D', text: 'Friday'}],
    correctAnswer: 'B'
  },
  {
    id: 'm25',
    number: 25,
    section: 'Mathematical',
    text: 'A person crosses a 600m long street in 5 minutes. What is his speed in km/hr?',
    options: [{id: 'A', text: '3.6'}, {id: 'B', text: '7.2'}, {id: 'C', text: '8.4'}, {id: 'D', text: '10'}],
    correctAnswer: 'B'
  }
];
