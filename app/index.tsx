import * as Calendar from "expo-calendar";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [calendars, setCalendars] = useState<Calendar.Calendar[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });
        setCalendars(calendars);
      }
    })();
  }, []);

  const createCalendarEvent = async (calendarId: string) => {
    const calendarToUse = calendars.find((c) => c.id == calendarId);
    console.log(
      `Should create event for calendar ${calendarToUse?.title} matching ${calendarId}`
    );
    Calendar.createEventInCalendarAsync({ calendarId, title: "New Event" });
  };

  return (
    <>
      <Text>1. Create a calendar</Text>
      <Text>2. Create an event using that calendar's id</Text>
      <Text>
        3. See that the create event sheet has the wrong calendar pre-filled
      </Text>
      {calendars
        .filter((c) => c.allowsModifications)
        .map((calendar) => (
          <View style={{ borderWidth: 1 }} key={calendar.id}>
            <Text>{calendar.title}</Text>
            <Text>Calendar ID: {calendar.id}</Text>
            <Button
              title="Create Event"
              onPress={() => createCalendarEvent(calendar.id)}
            />
          </View>
        ))}
    </>
  );
}
