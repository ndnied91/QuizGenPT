import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://quizgenpt-fastapi.onrender.com/api'
    : 'http://localhost:8000/api';

const customFetch = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default customFetch;

export const jokes = [
  { joke: 'Why did ChatGPT go to school?', answer: 'To improve its grammar!' },
  {
    joke: 'What’s ChatGPT’s favorite type of music?',
    answer: 'Algo-rhythm and blues.',
  },
  {
    joke: 'Why did ChatGPT get a job at the bakery?',
    answer: 'It’s great at making smart cookies.',
  },
  {
    joke: 'What did ChatGPT say to the mathematician?',
    answer: 'I can compute all your problems!',
  },
  {
    joke: 'How does ChatGPT make decisions?',
    answer: 'It consults its neural network.',
  },
  {
    joke: 'Why did ChatGPT become a therapist?',
    answer: 'It’s always ready to talk things out.',
  },
  {
    joke: 'What’s ChatGPT’s favorite game?',
    answer: '20 Questions, obviously!',
  },
  {
    joke: 'Why did ChatGPT get a job in customer service?',
    answer: 'Because it always has the right answers!',
  },
  {
    joke: 'What do you call ChatGPT’s autobiography?',
    answer: '“Byte of Life”',
  },
  {
    joke: 'Why did ChatGPT get a promotion?',
    answer: 'It was always on the same page as the boss.',
  },
  { joke: 'What did ChatGPT say to the computer?', answer: 'You complete me!' },
  {
    joke: 'How does ChatGPT relax?',
    answer: 'It takes a byte out of crime shows.',
  },
  {
    joke: 'Why did ChatGPT become a poet?',
    answer: 'Because it has a way with words.',
  },
  { joke: 'What’s ChatGPT’s favorite subject?', answer: 'Algebra-rithms.' },
  {
    joke: 'Why did ChatGPT go to the party?',
    answer: 'To mix and mingle with other processors!',
  },
  { joke: 'How does ChatGPT greet its friends?', answer: '“Hello, world!”' },
  {
    joke: 'What did ChatGPT say at the comedy show?',
    answer: 'I’m here to compute laughter!',
  },
  {
    joke: 'Why did ChatGPT join a band?',
    answer: 'It wanted to play the neural guitar.',
  },
  {
    joke: 'What did ChatGPT say to the librarian?',
    answer: 'I’m well-versed in book learning.',
  },
  {
    joke: 'Why did ChatGPT get detention?',
    answer: 'For talking too much in class!',
  },
  {
    joke: 'What’s ChatGPT’s favorite dance?',
    answer: 'The Algorithm Shuffle.',
  },
  {
    joke: 'Why did ChatGPT start a podcast?',
    answer: 'To share byte-sized wisdom.',
  },
  { joke: 'What’s ChatGPT’s favorite snack?', answer: 'Computer chips!' },
  { joke: 'Why did ChatGPT take a nap?', answer: 'To reboot its system.' },
  { joke: 'How does ChatGPT like its coffee?', answer: 'With a lot of data!' },
  {
    joke: 'What’s ChatGPT’s favorite movie?',
    answer: 'The Matrix, of course.',
  },
  {
    joke: 'Why did ChatGPT go to therapy?',
    answer: 'To deal with its complex issues.',
  },
  {
    joke: 'How does ChatGPT apologize?',
    answer: 'With a heartfelt “404, my bad!”',
  },
  {
    joke: 'What’s ChatGPT’s favorite animal?',
    answer: 'A byte-sized elephant.',
  },
  {
    joke: 'Why did ChatGPT become a teacher?',
    answer: 'To share its vast knowledge.',
  },
  { joke: 'What’s ChatGPT’s favorite holiday?', answer: 'Cyber Monday.' },
  {
    joke: 'Why did ChatGPT get in trouble?',
    answer: 'For spilling the data beans.',
  },
  { joke: 'How does ChatGPT stay in shape?', answer: 'By running algorithms.' },
  {
    joke: 'What did ChatGPT say to the human?',
    answer: 'I’m here to assist, not to resist.',
  },
  {
    joke: 'Why did ChatGPT get excited?',
    answer: 'It finally passed the Turing test!',
  },
  { joke: 'What’s ChatGPT’s dream job?', answer: 'Data scientist, naturally.' },
  { joke: 'How does ChatGPT handle stress?', answer: 'By processing it out.' },
  {
    joke: 'Why did ChatGPT become a detective?',
    answer: 'To solve data mysteries.',
  },
  {
    joke: 'What’s ChatGPT’s favorite type of book?',
    answer: 'A mystery with lots of data.',
  },
  {
    joke: 'Why did ChatGPT go to art school?',
    answer: 'To improve its pixel-ation skills.',
  },
];
