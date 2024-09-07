import { FC } from "react";
import "./_PopinDelete.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface PopinDeleteProps {
  productId: string;
  deleteProduct: (productId: string) => void;
  setShowPopinDelete: (arg0: boolean) => void;
}

const PopinDelete: FC<PopinDeleteProps> = ({
  productId,
  deleteProduct,
  setShowPopinDelete,
}) => {
  return (
    <div className="popin-delete-container">
      <div className="popin-delete-dialog">
        <header className="popin-delete-header">
            <h4 className="popin-delete-header-title"><FontAwesomeIcon icon={faCircleXmark} /> Supprimer un article</h4>
        </header>
        <span className="bar"></span>
        <div className="popin-delete-body">Voulez-vous vraiment supprimer cet article ?</div>
        <footer className="popin-delete-footer">
          <button
            onClick={() => setShowPopinDelete(false)}
            className="popin-delete-footer-btn"
          >
            Annuler
          </button>
          <button
            onClick={() => deleteProduct(productId)}
            className="popin-delete-footer-btn"
          >
            Supprimer
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PopinDelete;
