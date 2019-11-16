// Copyright 2019 New Relic Corporation. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Stack, StackItem, LineChart, ChartGroup, Button, Toast } from 'nr1';
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

  onClick = (graphic, name) => {
    Toast.showToast({
      title: 'Alert',
      description: `Please look the ${graphic}'s graphic of ${name}`,
      actions: [
        {
          label: 'Send Mail',
          onClick: () => console.log('Hello World!')
        }
      ],
      type: Toast.TYPE.NORMAL
    });
  };

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
              query={`SELECT filter(average(amount), where id = ${openedFacet.facet[0]}) as 'Global', average(amount) as 'Local' FROM StoreUpdate  SINCE 6 hour ago TIMESERIES`}
            />
            <Button
              onClick={() => this.onClick('sells', openedFacet.facet[1])}
              type={Button.TYPE.PRIMARY}
              iconType={Button.ICON_TYPE.DOCUMENTS__DOCUMENTS__EMAIL}
              className="alert-button"
            >
              Send Email
            </Button>
          </StackItem>
          <StackItem className="chart-stack-item">
            <h5 className="chart-header">Earnings</h5>
            <LineChart
              className="chartSection"
              accountId={accountId}
              query={`SELECT filter(average(amount)*0.3, where id = ${openedFacet.facet[0]}) as 'Global', average(amount)*0.3 as 'Local' FROM StoreUpdate  SINCE 6 hour ago TIMESERIES`}
            />
            <Button
              onClick={() => this.onClick('earnings', openedFacet.facet[1])}
              type={Button.TYPE.PRIMARY}
              iconType={Button.ICON_TYPE.DOCUMENTS__DOCUMENTS__EMAIL}
              className="alert-button"
            >
              Send Email
            </Button>
          </StackItem>
          <StackItem className="chart-stack-item">
            <h5 className="chart-header">Combos Selling</h5>
            <LineChart
              className="chartSection"
              accountId={accountId}
              query={`SELECT average(bigMac) as 'BigMac', average(chips) as Chips, average(mcMuffin) as 'McMuffin', average(mcNuggets) as 'McNutgets', average(milkshake) as 'MilkShake' FROM StoreSales WHERE storeID=${openedFacet.facet[0]} SINCE 1 hour ago TIMESERIES`}
            />
            <Button
              onClick={() => this.onClick('products', openedFacet.facet[1])}
              type={Button.TYPE.PRIMARY}
              iconType={Button.ICON_TYPE.DOCUMENTS__DOCUMENTS__EMAIL}
              className="alert-button"
            >
              Send Email
            </Button>
          </StackItem>
        </Stack>
      </ChartGroup>
    );
  }
}
