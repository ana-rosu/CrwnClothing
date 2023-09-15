import { useNavigate } from "react-router-dom";
import {
  StyledBackgroundImage,
  StyledDirectoryItemBody,
  StyledDirectoryItemContainer,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
  return (
    <StyledDirectoryItemContainer onClick={onNavigateHandler}>
      <StyledBackgroundImage imageUrl={imageUrl} />
      <StyledDirectoryItemBody>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </StyledDirectoryItemBody>
    </StyledDirectoryItemContainer>
  );
};

export default DirectoryItem;
