import {
  Box,
  Button,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Tooltip,
  Typography,
} from '@mui/joy';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';

import React from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useTranslation } from 'react-i18next';

export default function FileUpload({
  onFile,
}: {
  onFile: (file: File | null) => void;
}) {
  const { t } = useTranslation();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      onFile(event.target.files[0]);
    }
  };

  const clearFileInput = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
    setSelectedFile(null);
    onFile(null);
  };

  return (
    <Box>
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
        onChange={uploadFile}
      />
      <Button
        role={undefined}
        tabIndex={0}
        variant="outlined"
        component="label"
        color="neutral"
        sx={{ width: '100%', display: selectedFile ? 'none' : 'flex' }}
        startDecorator={<UploadFileIcon />}
        onClick={() => inputRef.current?.click()}
      >
        {t('pages.forms.nachklausur.uploadBtn')}
      </Button>

      {selectedFile && (
        <Box>
          <List
            sx={{
              my: 2,
              '--List-radius': '10px',
              border: '1px solid #4b4b4b79',
              p: 1,
            }}
          >
            <ListItem
              sx={{
                width: '99%',
                m: '0',
                border: '1px solid #4b4b4b79',
                backgroundColor: '#74747410',
              }}
            >
              <ListItemDecorator>
                <DescriptionIcon />
              </ListItemDecorator>
              <ListItemContent>
                <Tooltip arrow placement="top" title={selectedFile.name}>
                  <Typography noWrap level="title-sm">
                    {selectedFile.name + ''}
                  </Typography>
                </Tooltip>
                <Typography level="body-sm">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </Typography>
              </ListItemContent>
              <IconButton edge="end" onClick={clearFileInput}>
                <CloseIcon />
              </IconButton>
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
}
