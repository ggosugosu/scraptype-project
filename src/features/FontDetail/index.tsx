type FontDetailProps = {
  font_id: string;
}
const FontDetail = ({font_id}: FontDetailProps) => {
  return <section>
    FontDetail: {font_id}
  </section>;
};

export default FontDetail;