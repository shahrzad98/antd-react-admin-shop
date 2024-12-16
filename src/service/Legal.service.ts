import { ApiBuilder } from '@shared/utils';
import { LegalCondition } from '@src/model/Legal.model';

const API = new ApiBuilder<LegalCondition>('legals');

const getLegal = async (name: string): Promise<LegalCondition> => {
  return await API.request<LegalCondition>({ method: 'GET', url: '/legals/' + name });
};

export default { getLegal };
