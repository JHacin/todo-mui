import React, { ChangeEventHandler, FC, useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { createStyles, fade, InputAdornment, TextField, Theme, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch } from '../../../redux/store';
import { updateSearch } from '../../../redux/features/search/searchSlice';
import { useDebounce } from '../../../hooks/useDebounce';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
    },
    input: {
      color: theme.palette.common.white,
      padding: theme.spacing(1),
    },
    inputAdornment: {
      padding: theme.spacing(1, 0, 1, 1),
      marginRight: 0,
    },
    icon: {
      color: theme.palette.common.white,
    },
  })
);

export const TodoSearchInput: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const rootStateSearch = useSelector((state: RootState) => state.search);
  const [search, setSearch] = useState<string>(rootStateSearch);
  const debouncedSearch = useDebounce<string>(search, 250);

  useEffect(() => {
    if (debouncedSearch !== rootStateSearch) {
      dispatch(updateSearch(debouncedSearch));
    }
  }, [dispatch, rootStateSearch, debouncedSearch]);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (event): void => {
    setSearch(event.target.value);
  };

  const onClearHandler = (): void => {
    setSearch('');
  };

  return (
    <TextField
      value={search}
      onChange={onChangeHandler}
      placeholder="Find a task..."
      InputProps={{
        classes: {
          root: classes.inputRoot,
          input: classes.input,
        },
        disableUnderline: true,
        startAdornment: (
          <InputAdornment position="start" classes={{ root: classes.inputAdornment }}>
            <SearchIcon
              classes={{
                root: classes.icon,
              }}
            />
          </InputAdornment>
        ),
        endAdornment: search && (
          <InputAdornment position="end">
            <IconButton onClick={onClearHandler}>
              <ClearIcon
                classes={{
                  root: classes.icon,
                }}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
};
