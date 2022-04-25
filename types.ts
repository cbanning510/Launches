export interface Rocket {
  rocket: {
    company: string;
    mass: {
      lb: number;
    };
  };
  rocket_name: string;
}

export interface Launches {
  launch_date_local: Date;
  mission_name: string;
  mission_id: string;
  launch_site: {
    site_name: string;
  };
  rocket: Rocket;
}
