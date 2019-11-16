// Copyright 2019 New Relic Corporation. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Stack, StackItem, LineChart, ChartGroup, Button } from 'nr1';
import PropTypes from 'prop-types';
import numeral from 'numeral';

export default class DetailsPanel extends React.Component {
  static propTypes = {
    accountId: PropTypes.number.isRequired,
    openedFacet: PropTypes.object.isRequired,
    togglePageViewDetails: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { accountId, openedFacet } = this.props;
    const pageViewCount = openedFacet.x;
    return (
      <ChartGroup>
        <Stack
          directionType={Stack.DIRECTION_TYPE.VERTICAL}
          horizontalType={Stack.HORIZONTAL_TYPE.TRAILING}
          className="details-panel"
        >
          <StackItem className="details-panel-headers">
            <h3 className="details-panel-header">
              {`${openedFacet.facet[0]} ${openedFacet.facet[1]}`}
            </h3>
            <span className="details-panel-subheader">
              {numeral(pageViewCount).format('0,0')} Pageviews
            </span>
            <Button
              size="small"
              type={Button.TYPE.PLAIN}
              onClick={() => {
                this.props.togglePageViewDetails(null);
              }}
              className="close-button"
              iconType={Button.ICON_TYPE.INTERFACE__SIGN__TIMES__V_ALTERNATE}
            />
          </StackItem>
          <StackItem className="chart-stack-item">
            <h5 className="chart-header">Sell's Amount</h5>
            <LineChart
              className="chartSection"
              accountId={accountId}
              query={`SELECT filter(average(amount), where id = ${openedFacet.facet[0]}) as 'Global', average(amount) as 'Local' FROM StoreUpdate  SINCE 1 day ago TIMESERIES`}
            />
            <Button
              onClick={() => alert('Hello World!')}
              type={Button.TYPE.PRIMARY}
              iconType={Button.ICON_TYPE.DOCUMENTS__DOCUMENTS__EMAIL}
              className="alert-button"
            >
              Send Alert
            </Button>
          </StackItem>
          <StackItem className="chart-stack-item">
            <h5 className="chart-header">Hamburger Number</h5>
            <LineChart
              className="chartSection"
              accountId={accountId}
              query={`SELECT filter(average(hamburguer), where id = ${openedFacet.facet[0]}) as 'Global', average(hamburguer) as 'Local' FROM StoreUpdate  SINCE 1 day ago TIMESERIES`}
            />
            <Button
              onClick={() => alert('Hello World!')}
              type={Button.TYPE.PRIMARY}
              iconType={Button.ICON_TYPE.DOCUMENTS__DOCUMENTS__EMAIL}
              className="alert-button"
            >
              Send Alert
            </Button>
          </StackItem>
          <StackItem className="chart-stack-item">
            <h5 className="chart-header">Combos Selling</h5>
            <LineChart
              className="chartSection"
              accountId={accountId}
              query={`SELECT filter(average(combo), where id = ${openedFacet.facet[0]}) as 'Global', average(combo) as 'Local' FROM StoreUpdate  SINCE 1 day ago TIMESERIES`}
            />
            <Button
              onClick={() => alert('Hello World!')}
              type={Button.TYPE.PRIMARY}
              iconType={Button.ICON_TYPE.DOCUMENTS__DOCUMENTS__EMAIL}
              className="alert-button"
            >
              Send Alert
            </Button>
          </StackItem>
        </Stack>
      </ChartGroup>
    );
  }
}
