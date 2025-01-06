import { useLang } from '../../hooks/ts/useLang';

const translations = {
  en: {
    title: 'Latest News',
    content: 'Stay updated with the latest happenings around the world.'
  },
  es: {
    title: 'Últimas Noticias',
    content: 'Mantente al día con los últimos acontecimientos en el mundo.'
  }
};

export const UpdateAppLanguage = () => {
  const lang = useLang();
  const currentLang = lang.startsWith('es') ? 'es' : 'en';

  return (
    <>
      <h1>{translations[currentLang].title}</h1>
      <p>{translations[currentLang].content}</p>
    </>
  );
};
