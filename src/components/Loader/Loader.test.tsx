import { describe, expect, it } from "vitest";
import { renderWithMantine } from "../../test-utils";
import AppLoader from "./Loader";

describe("Загрузчик", () => {
  it("отображает скелетон загрузки вместо картинки", () => {
    renderWithMantine(<AppLoader />);

    const skeletonElement = document.querySelector(".mantine-Skeleton-root");
    
    expect(skeletonElement).toBeInTheDocument();
  });
});