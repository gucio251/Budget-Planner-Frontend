import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withExpensesGroupedByType from 'hocs/withExpensesGroupedByType';
import { Pie, Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import GroupedTransactionsDisplayer from 'components/GroupedTransactionsDisplayer/GroupedTransactionsDisplayer'

const GraphArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const GraphWrapper = styled.div`
  height: 350px;
  width: 60%;
  display: flex;
  align-items: center;
`

const DisplayWrapper = styled.div`
  width: 50%;
`

const GraphAndStatsGroupedByType = ({dataToGraph, expensesGroupedByType}) => {
  const options = {
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const sum = ctx.dataset._meta[0].total;
          const percentage = ((value * 100) / sum).toFixed(0) + '%';
          return percentage;
        },
        color: '#fff',
      },
    },
  };
  return (
      <>
        <GraphArea>
          <GraphWrapper>
            <Doughnut
              data={dataToGraph}
              options={options}
            />
          </GraphWrapper>
          <DisplayWrapper>
            <GroupedTransactionsDisplayer
              expensesGroupedByType={expensesGroupedByType}
            />
          </DisplayWrapper>
        </GraphArea>
      </>
    );
};

GraphAndStatsGroupedByType.propTypes = {
    
};

export default withExpensesGroupedByType(GraphAndStatsGroupedByType);