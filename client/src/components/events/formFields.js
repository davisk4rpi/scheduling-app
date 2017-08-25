export default [
  { label: 'Event Title', subLabel: 'required', name: 'name' },
  { label: 'Description', subLabel: 'required', name: 'description' },
  { label: 'Duration', subLabel: 'required', name: 'duration' },
  {
    label: 'Start Time',
    subLabel:
      'Events without a start time will just be added to your To Do List',
    name: 'startTime'
  }
];
