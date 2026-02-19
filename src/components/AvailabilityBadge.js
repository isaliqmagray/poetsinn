import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

function FloatingAvailability() {
  const [availableRooms, setAvailableRooms] = useState(0);

  const calculateAvailability = async () => {
    try {
      // 1️⃣ Total active rooms
      const { count: totalRooms, error: roomsError } = await supabase
        .from("rooms")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      if (roomsError) {
        console.log("Rooms Error:", roomsError);
        return;
      }

      // 2️⃣ Confirmed bookings for TODAY
      const today = new Date().toISOString().split("T")[0];

      const { count: confirmedBookings, error: bookingError } =
        await supabase
          .from("bookings")
          .select("*", { count: "exact", head: true })
          .eq("status", "confirmed")
          .lte("from_date", today)
          .gt("to_date", today);

      if (bookingError) {
        console.log("Booking Error:", bookingError);
        return;
      }

      const available = totalRooms - confirmedBookings;

      setAvailableRooms(available >= 0 ? available : 0);
    } catch (err) {
      console.log("Availability Error:", err);
    }
  };

  useEffect(() => {
    calculateAvailability();

    // 🔄 Real-time update when bookings change
    const channel = supabase
      .channel("availability-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        () => {
          calculateAvailability();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="floating-availability">
      🏨 {availableRooms} Rooms Available
    </div>
  );
}

export default FloatingAvailability;
