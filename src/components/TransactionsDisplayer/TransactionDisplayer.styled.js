import styled from 'styled-components';
import { ReactComponent as Expand } from 'assets/icons/expand.svg';

export const RowContainer = styled.div`
  padding: 0 1em;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.mainBlue};
`;

export const Table = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  position: relative;
  width: 100%;
`;

export const TableHeader = styled.thead`
  th {
    width: 19%;
  }

  & > * > th:first-child {
    width: ${({ withDeletionContent }) =>
      withDeletionContent ? '10%' : '29%'};
  }

  & > * > th:nth-child(2) {
    width: 25%;
  }

  & > * > th:nth-child(5) {
    width: 15%;
  }

  & > * > th:last-child {
    width: 20%;
  }

  ${({ theme }) => theme.devices.tablet} {
    & > * > th:nth-child(1) {
      width: ${({ withDeletionContent }) =>
        withDeletionContent ? '10%' : '50%'};
    }
    & > * > th:nth-child(2) {
      width: ${({ withDeletionContent }) =>
        withDeletionContent ? '50%' : '25%'};
    }

    & > * > th:last-child {
      width: 30%;
    }
  }

  ${({ theme }) => theme.devices.mobile} {
    & > * > th:nth-child(2) {
      width: 55%;
    }

    & > * > th:last-child {
      width: ${({ withDeletionContent }) =>
        withDeletionContent ? '35%' : '50%'};
    }
  }
`;

export const TableRow = styled.tr`
  & > td:first-child,
  & > th:first-child {
    padding-left: 1.5em;
  }

  & > td:last-child,
  & > th:last-child {
    padding-right: 1.5em;
  }

  ${({ theme }) => theme.devices.tablet} {
    & > td:nth-child(4),
    & > th:nth-child(4),
    & > td:nth-child(3),
    & > th:nth-child(3) {
      display: none;
    }
  }

  ${({ theme }) => theme.devices.mobile} {
    & > th:nth-child(2) {
      display: none;
    }

    & > td:nth-child(3),
    & > th:nth-child(3),
    & > td:nth-child(4),
    & > th:nth-child(4) {
      display: none;
    }

    & > td:nth-child(2),
    & > th:nth-child(2) {
      display: ${({ withDeletionContent }) =>
        withDeletionContent == true ? 'table-cell' : 'none'};
    }

    & > td:nth-child(5),
    & > th:nth-child(5) {
      display: ${({ withDeletionContent }) =>
        !withDeletionContent == true ? 'table-cell' : 'none'};
    }

    & > td:first-child,
    & > th:first-child {
      padding-left: 0.5em;
    }

    & > td:last-child,
    & > th:last-child {
      padding-right: 0.5em;
    }
  }
`;

export const HeaderField = styled.th`
  padding: 10px 0;
  color: ${({ theme }) => theme.dashboardBlack};
  font-weight: 450;
  border-bottom: 1px solid #efeff3;

  ${({ theme }) => theme.devices.tablet} {
    width: 25%;
  }
`;

export const LeftCenteredSpan = styled.span`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const RightCenteredSpan = styled.span`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${({ theme }) => theme.devices.mobile} {
  }
`;

export const TableBody = styled.tbody`
  & > * > td:nth-child(3),
  & > * > td:nth-child(4) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const DateFieldInRow = styled.td`
  padding: 0.5em 0;
  width: 100%;
  border-bottom: 1px solid #efeff3;
  background-color: #efeff3;
`;

export const StyledDateText = styled.span`
  display: flex;
`;

export const CheckboxTd = styled.td`
  padding: 10px 0px;
  border-bottom: 1px solid #efeff3;
`;

export const Field = styled.td`
  min-width: 19%;
  padding: 10px 0px;
  border-bottom: 1px solid #efeff3;

  ${({ theme }) => theme.devices.tablet} {
    width: 25%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TextWrapper = styled.div`
  margin-left: 1em;
`;

export const MainText = styled.p`
  font-size: 1em;
`;

export const MobileRow = styled.div`
  display: none;
  padding-top: 10px;
  max-height: ${({ active }) => (!active ? 0 : '100px')};
  overflow: hidden;
  transition: all 1s;

  ${({ theme }) => theme.devices.mobile} {
    display: block;
  }
`;

export const Text = styled.p`
  font-size: 0.85em;
  margin-left: 50px;
`;

export const TextContainerMobile = styled.div``;

export const StyledExpand = styled(Expand)`
  transform: ${({ active }) => (active ? 'rotate(0deg)' : 'rotate(180deg)')};
  transition: 0.5 all;
  cursor: pointer;
  display: none;

  ${({ theme }) => theme.devices.mobile} {
    display: block;
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-right: 20px;
`;
