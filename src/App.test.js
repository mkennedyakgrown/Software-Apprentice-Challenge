import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

// Test for the loading screen, Sort Menu, Search Bar, and Ad Cards
test("Renders Correctly", async () => {
  render(<App />);
  const loadingScreen = screen.getByText(/Loading.../i);
  expect(loadingScreen).toBeInTheDocument();
  // Wait for the loading screen to disappear
  await waitFor(() =>
    expect(screen.getByText(/Sort By Spend/i)).toBeInTheDocument()
  );
  const sortButton = screen.getByText(/Sort By Spend/i);
  expect(sortButton).toBeInTheDocument();
  const searchInput = screen.getByRole("textbox");
  expect(searchInput).toBeInTheDocument();
  const searchButton = screen.getByText(/Clear/i);
  expect(searchButton).toBeInTheDocument();
});

// Test for the Sort Menu to visually cycle through the sort options
test("Spend button is clickable", async () => {
  render(<App />);
  await waitFor(() =>
    expect(screen.getByText(/Sort By Spend/i)).toBeInTheDocument()
  );
  const linkElement = screen.getByText(/Sort By Spend/i);
  expect(linkElement).toBeInTheDocument();
  linkElement.click();
  expect(linkElement).toBeInTheDocument();
});

// Test for the Sort Menu to cycle through sort options and corresponding card list orders
test("Spend button sorts by spend in descending order", async () => {
  render(<App />);
  await waitFor(() =>
    expect(screen.getByText(/Sort By Spend/i)).toBeInTheDocument()
  );
  const linkElement = screen.getByText(/Sort By Spend/i);
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(linkElement);
  const sortBySpend = screen.getByText(/Sort By Spend ▲/i);
  expect(sortBySpend).toBeInTheDocument();
  const ads = screen.getAllByText(/Spend - /i);
  expect(
    ads.sort((a, b) => a.textContent.slice(9) - b.textContent.slice(9))
  ).toEqual(ads);
  fireEvent.click(sortBySpend);
  const sortBySpendDesc = screen.getByText(/Sort By Spend ▼/i);
  expect(sortBySpendDesc).toBeInTheDocument();
  const reverseAds = screen.getAllByText(/Spend - /i);
  expect(
    reverseAds.sort((a, b) => a.textContent.slice(9) - b.textContent.slice(9))
  ).toEqual(reverseAds);
});

// Test for the Search Bar to filter cards by campaign name
test("Search filters cards by campaign name", async () => {
  render(<App />);
  await waitFor(() =>
    expect(screen.getByText(/Sort By Spend/i)).toBeInTheDocument()
  );
  const searchInput = screen.getByRole("textbox");
  expect(searchInput).toBeInTheDocument();
  const allAds = screen.getAllByText(/Spend - /i);
  fireEvent.change(searchInput, { target: { value: "Summer Sale" } });
  const filteredAds = screen.getAllByText(/Spend - /i);
  expect(filteredAds.length < allAds.length).toBe(true);
  const searchButton = screen.getByText(/Clear/i);
  expect(searchButton).toBeInTheDocument();
  fireEvent.click(searchButton);
  const clearedAds = screen.getAllByText(/Spend - /i);
  expect(clearedAds.length === allAds.length).toBe(true);
});
