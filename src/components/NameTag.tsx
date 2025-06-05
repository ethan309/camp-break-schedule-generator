import { Tag, TagCloseButton } from "@chakra-ui/react";
import { useCallback } from "react";

interface IProps {
    name: string;
    onRemove?(name: string): void;
}

const NameTag = (props: IProps) => {
    const { name, onRemove } = props;

    const onClick = useCallback(() => onRemove?.(name), [name, onRemove]);

    return (
        <Tag>
            {name}
            {onRemove && <TagCloseButton onClick={onClick} />}
        </Tag>
    );
};

export default NameTag;
