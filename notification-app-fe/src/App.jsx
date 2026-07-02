import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
} from "@mui/material";

import NotificationFilter from "./components/NotificationFilter";
import { getNotifications } from "./services/api";
import { sortNotifications } from "./utils/priority";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await getNotifications();
        setNotifications(sortNotifications(data));
      } catch (error) {
        console.log(error);
      }
    }

    loadNotifications();
  }, []);

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((item) => item.Type === filter);

  const priorityNotifications = sortNotifications(notifications).slice(0, 10);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>

      <Typography variant="h4" align="center" gutterBottom>
        Notification Dashboard
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Filter
      </Typography>

      <NotificationFilter
        value={filter}
        onChange={setFilter}
      />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5">
        Priority Notifications
      </Typography>

      {priorityNotifications.map((item) => (
        <Card sx={{ mt: 2 }} key={item.ID}>
          <CardContent>
            <Typography variant="h6">
              {item.Type}
            </Typography>

            <Typography>
              {item.Message}
            </Typography>

            <Typography color="gray">
              {item.Timestamp}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5">
        All Notifications
      </Typography>

      {filteredNotifications.map((item) => (
        <Card sx={{ mt: 2 }} key={item.ID}>
          <CardContent>

            <Typography variant="h6">
              {item.Type}
            </Typography>

            <Typography>
              {item.Message}
            </Typography>

            <Typography color="gray">
              {item.Timestamp}
            </Typography>

          </CardContent>
        </Card>
      ))}

    </Container>
  );
}

export default App;