import { gql, useQuery } from "@apollo/client";

export const ROCKETS_QUERY = gql`
  query UpcomingLaunches {
    launchesUpcoming {
      launch_date_local
      mission_name
      mission_id
      launch_site {
        site_name
      }
      rocket {
        rocket {
          company
          mass {
            lb
          }
        }
        rocket_name
      }
    }
  }
`;
