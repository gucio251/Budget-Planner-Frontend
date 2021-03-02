import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Dropdown from 'components/UI/Dropdown';
import { ReactComponent as LeftChevron } from 'assets/icons/leftChevron.svg';

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TextWrapper = styled.p`
  display: inline-block;
  white-space: nowrap;
`;

const LeftSideWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: #7a7d8a;
`;

const RightSideWrapper = styled.div`
  display: flex;

  & > *:first-child,
  & > *:last-child {
    height: 100%;
    align-items: center;
    cursor: pointer;
  }
`;

const PaginationItem = styled.div`
  width: 32px;
  margin: 0 5px;
  background-color: ${({ active, theme }) =>
    active ? theme.mainBlue : 'white'};
  color: ${({ active, theme }) => (!active ? theme.mainBlue : 'white')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
`;

const RightChevron = styled(LeftChevron)`
  transform: rotate(180deg);
`;

const DropdownWrapper = styled.div`
  min-width: 70px;
`;

const dropdownOptions = [
  { value: 2, label: '2' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

const calculatePaginationSetup = (activePage, totalPosts, postsPerPage) => {
  const totalPagesAmount = Math.ceil(totalPosts / postsPerPage);

  if (totalPagesAmount < 7)
    return Array.from({ length: totalPagesAmount }, (_, i) => i + 1);

  if (activePage <= 4) return [1, 2, 3, 4, 5, '...', totalPagesAmount];

  if (totalPagesAmount - activePage <= 3)
    return [
      1,
      '...',
      totalPagesAmount - 4,
      totalPagesAmount - 3,
      totalPagesAmount - 2,
      totalPagesAmount - 1,
      totalPagesAmount,
    ];

  return [
    1,
    '...',
    activePage - 1,
    activePage,
    activePage + 1,
    '...',
    totalPagesAmount,
  ];
};

const Pagination = ({
  postsPerPage,
  currentActivePage,
  totalPosts,
  handlePostsAmountChange,
  changeActivePage,
  moveToNextPage,
  moveToPreviousPage,
}) => {
  const itemsToBeDisplayedInPagination = calculatePaginationSetup(
    currentActivePage,
    totalPosts,
    postsPerPage
  );
  return (
    <PaginationWrapper>
      <LeftSideWrapper>
        <TextWrapper>View</TextWrapper>
        <DropdownWrapper>
          <Dropdown
            value={dropdownOptions[1]}
            list={dropdownOptions}
            onChange={({ value }) => handlePostsAmountChange(value)}
            name="transactionsPerPage"
            isSearchable={true}
          />
        </DropdownWrapper>
        <TextWrapper>transactions per page</TextWrapper>
      </LeftSideWrapper>
      <RightSideWrapper>
        <LeftChevron
          onClick={() =>
            currentActivePage === 1 ? null : moveToPreviousPage()
          }
        />
        {itemsToBeDisplayedInPagination.map((arrItem, index) => (
          <PaginationItem
            key={index}
            active={currentActivePage === arrItem}
            onClick={() =>
              arrItem === '...' ? null : changeActivePage(arrItem)
            }
          >
            {arrItem}
          </PaginationItem>
        ))}
        <RightChevron
          onClick={() =>
            currentActivePage === Math.ceil(totalPosts / postsPerPage)
              ? null
              : moveToNextPage()
          }
        />
      </RightSideWrapper>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  postsPerPage: PropTypes.number.isRequired,
  currentActivePage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  handlePostsAmountChange: PropTypes.func.isRequired,
  changeActivePage: PropTypes.func.isRequired,
  moveToNextPage: PropTypes.func.isRequired,
  moveToPreviousPage: PropTypes.func.isRequired,
};

export default Pagination;
