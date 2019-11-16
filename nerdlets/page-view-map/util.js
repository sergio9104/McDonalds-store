export const entityQuery = guid => {
  return `{
    actor {
      entity(guid: "${guid}") {
        ... on BrowserApplicationEntity {
          settings {
            apdexTarget
          }
          accountId
          applicationId
          name
          servingApmApplicationId
        }
      }
    }
  }`;
};

export const mapData = (accountId, appId, launcherUrlState) => {
  const query = `{
    actor {
      account(id: ${accountId}) {
        mapData: nrql(query: "SELECT count(*) as x, average(amount) as y, sum(lat)/count(*) as lat, sum(long)/count(*) as lng FROM StoreUpdate SINCE 1 day ago FACET id, name LIMIT 1000") {
          results
          nrql
        }
      }
    }
  }`;
  // console.debug(query);
  return query;
};

/**
 * Provide a color from the standard palette based on apdexTarget
 * @param {number} measure - value beign measure, commonly duration
 * @param {number} apdexTarget - configured value of the apdex target for a given entity
 */
export const getMarkerColor = (measure, apdexTarget) => {
  if (measure <= apdexTarget) {
    return '#11A600';
  } else if (measure >= apdexTarget && measure <= apdexTarget * 4) {
    return '#FFD966';
  } else {
    return '#BF0016';
  }
};
