import React from 'react';

import {
  StyledForm,
  Row,
  InputFieldWrapper,
  DropdownWrapper,
  RowWithMargins,
  RowWithMarginForHigherInput,
  StyledAddIcon,
} from './ModifyTransactionTemplate.styled';

import Button from 'components/UI/Button';
import DatePicker from 'components/UI/DatePicker';
import Dropdown from 'components/UI/Dropdown';
import InputWithBorder from 'components/UI/InputWithBorder';
import LabelWrapper from 'components/UI/LabelWrapper';
import TextArea from 'components/UI/TextArea';

const ModifyTransaction = ({
  values,
  handleChange,
  handleSubmit,
  setFieldValue,
  handleBlur,
  categories,
  subcategories,
  formCorrectness,
  subcategoryDisabled,
  currencies
}) => {
  return (
        <StyledForm onSubmit={handleSubmit}>
          <Row>
            <InputFieldWrapper>
              <LabelWrapper label={'Amount'}>
                <InputWithBorder
                  name={'amount'}
                  value={values['amount']}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  type="number"
                  step="0.1"
                  placeholder="0.00"
                />
              </LabelWrapper>
            </InputFieldWrapper>
            <DropdownWrapper>
              <LabelWrapper label="Currency">
                <Dropdown
                  list={currencies}
                  name="currency"
                  isSearchable={true}
                  value={currencies.filter((currency) => {
                    return currency.id === values['currency_id']
                      ? currency.value
                      : '';
                  })}
                  onChange={(selectedOption) => {
                    setFieldValue('currency', selectedOption.value);
                    setFieldValue('currency_id', selectedOption.id);
                  }}
                  handleBlur={handleBlur}
                  isLoading={false}
                  label="Select Currency"
                />
              </LabelWrapper>
            </DropdownWrapper>
          </Row>
          <RowWithMargins>
            <LabelWrapper label="Select category">
              <Dropdown
                list={categories}
                name="category"
                isSearchable={false}
                value={values.category ? { label: values.category } : ''}
                onChange={(selectedOption) => {
                  handleChange('category')(selectedOption.value);
                  setFieldValue('subcategory', null);
                }}
                handleBlur={handleBlur}
                isLoading={false}
              />
            </LabelWrapper>
          </RowWithMargins>
          <RowWithMargins>
            <LabelWrapper label="Select subcategory">
              <Dropdown
                list={subcategories}
                name="subcategory"
                isSearchable={false}
                value={values.subcategory ? { label: values.subcategory } : ''}
                onChange={(selectedOption) => {
                  setFieldValue('category_id', selectedOption.id);
                  setFieldValue('subcategory', selectedOption.value);
                }}
                handleBlur={handleBlur}
                isLoading={false}
                disabledWithoutOption={subcategoryDisabled}
              />
            </LabelWrapper>
          </RowWithMargins>
          <RowWithMargins>
            <LabelWrapper label="Date">
              <DatePicker
                name="transaction_date"
                value={values.transaction_date}
                handleBlur={handleBlur}
                onChange={setFieldValue}
              />
            </LabelWrapper>
          </RowWithMargins>
          <RowWithMarginForHigherInput>
            <LabelWrapper label={'Write a note'}>
              <TextArea
                name={'comments'}
                value={values['comments']}
                handleChange={handleChange}
                placeholder="Place for your note"
                handleBlur={handleBlur}
              />
            </LabelWrapper>
          </RowWithMarginForHigherInput>
          <Button
            type="submit"
            handleFormSubmit={handleSubmit}
            disabled={formCorrectness ? false : true}
          >
            <StyledAddIcon disabled={!formCorrectness ? true : false} />
            Add
          </Button>
        </StyledForm>
  );
};

export default React.memo(ModifyTransaction);
