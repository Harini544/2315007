export function getPriority(type) {
  switch (type) {
    case "Placement":
      return 3;
    case "Result":
      return 2;
    case "Event":
      return 1;
    default:
      return 0;
  }
}

export function sortNotifications(notifications) {
  return [...notifications].sort((a, b) => {
    const priorityDiff = getPriority(b.Type) - getPriority(a.Type);

    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });
}