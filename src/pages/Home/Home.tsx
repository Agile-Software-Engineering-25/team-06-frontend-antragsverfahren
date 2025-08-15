import { Box, Typography } from '@mui/joy';
import LanguageSelectorComponent from '@components/LanguageSelectorComponent/LanguageSelectorComponent';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import i18n from '@/i18n';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 2, maxWidth: 700, mx: 'auto' }}>
      <button onClick={() => i18n.changeLanguage('de')}>Deutsch</button>
      <button onClick={() => i18n.changeLanguage('en')}>English</button>

      <Typography>{t('pages.home.title')}</Typography>
      <Button onClick={() => navigate('/weather')}>
        {t('pages.home.weatherButton')}
      </Button>
      <LanguageSelectorComponent />
    </Box>
  );
};

export default Home;
