import { InlineWidget } from 'react-calendly';

export default function CalendlyWidget() {
  return (
    <div className="my-8">
      <InlineWidget 
        url="TU_URL_DE_CALENDLY"
        styles={{ height: '650px' }}
        pageSettings={{
          backgroundColor: 'ffffff',
          hideEventTypeDetails: false
        }}
      />
    </div>
  );
}