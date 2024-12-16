import { ApiBuilder } from '@shared/utils';
import { Template } from '@src/model/Template.model';

const API = new ApiBuilder<Template>('templates');

const getTemplates = async (): Promise<Template> => {
  return (await API.getAll({ params: { slug: 'landing' } })).data[0];
};

const getCustomTemplate = async (slug: string): Promise<Template> => {
  return (await API.getAll({ params: { slug } })).data[0];
};

export default { getTemplates, getCustomTemplate };
