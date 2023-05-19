import { bot } from './instance';
import './config';
import './commands';
import './events';

const bootstrap = () => {
  bot.launch();
};

bootstrap();
