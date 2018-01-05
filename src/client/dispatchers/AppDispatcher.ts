import {Dispatcher} from 'flux';
import {Action} from '../constants/Constants';

// Dispatcherの汎用的な型
export class PayLoad {
  constructor(public actionType: Action, public value: string) {}
}

export default new Dispatcher();