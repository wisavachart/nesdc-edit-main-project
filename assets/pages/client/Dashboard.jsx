import React, { useEffect, useState } from "react";
import ClientHeader from "../../components/menu/client-header";

const Dashboard = () => {
  // const [years, setYears] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchYear = async () => {
  //     try {
  //       const response = await EconomicApi.getYear();
  //       setYears(response.data.year); // Assuming the response contains a 'year' array
  //     } catch (err) {
  //       setError(err.message || "An error occurred");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchYear();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      <ClientHeader pageName="Dashboard" />
    </div>
  );
};

export default Dashboard;
