import { bot } from './instance';
import './config';
import './commands';
import './events/voice';

const bootstrap = () => {
  bot.launch();
};

bootstrap();
