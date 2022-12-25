
-- Products to re-order 
CREATE OR REPLACE VIEW vwMinproduct AS 
SELECT productCode, description, quantityOnHand
FROM Product
WHERE quantityOnHand < minQuantityOnHand;

-- All Products and Supplier names 

CREATE OR REPLACE VIEW vwAllProductsAdmin AS
SELECT productCode, description, supplierCode
FROM Supplier NATURAL JOIN Product;

-- View all Salesperson assignments 

CREATE OR REPLACE VIEW vwSalesassistance AS
SELECT employeeId, employeeFirstName, employeeLastName, clientCode
FROM Employee NATURAL JOIN SalesPerson NATURAL JOIN Client;

-- View all Invoices 
CREATE OR REPLACE VIEW vwInvoices AS
SELECT * FROM Invoice;

--  View products that are above a certain price and eligible for discount
CREATE OR REPLACE VIEW vwProduct AS
SELECT productCode, description, price
FROM Product
WHERE price >= 100.00;





-- Procedure for invoices between dates

CREATE PROCEDURE spInvByDate (d1 date, d2 date) LANGUAGE
plpgsql
AS $$
DECLARE cnt int;
BEGIN
SELECT COUNT(*) INTO cnt
FROM Invoice
WHERE invoiceDate BETWEEN d1 AND d2;
RAISE NOTICE 'Number of invoices between % and % is: %', d1,
d2, cnt; END;
$$;



-- Stored procedure 

DROP PROCEDURE IF EXISTS spPrintProdPrices;

CREATE PROCEDURE spPrintProdPrices (width int, max int)
LANGUAGE plpgsql
AS $$
DECLARE
  p1 int := 0;
  p2 int := 10;
  num int;
        
BEGIN
  WHILE p2 < max LOOP
    num := (SELECT COUNT(*)
             FROM Product 
             WHERE Price BETWEEN p1 AND p2);

    RAISE NOTICE 'There are % Products with price between % and %', num, p1, p2;
    p1 := p2 + 1;
    p2 := p2 + width;
  END LOOP;
END;
$$





-- 2) SQL function to return the number of invoices by customer name

DROP FUNCTION IF EXISTS fnGetInvCount;

CREATE FUNCTION fnGetInvCount(lname varchar(15), fname varchar(15))
RETURNS integer 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN (SELECT COUNT(*)
          FROM Invoice AS I JOIN Client AS C ON I.clientCode = C.clientCode
          WHERE lastName = lname AND firstName = fname);
END;
$$

-- 3) Trigger created on Line insertion, to update the client balance:

DROP TRIGGER IF EXISTS trLineIns ON Product;
DROP FUNCTION IF EXISTS updateClient();

CREATE FUNCTION updateClient() RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE Client
  SET balance = balance + NEW.unitPrice * NEW.quantity
  WHERE clientCode = (SELECT clientCode
                        FROM Invoice
                        WHERE invoiceNumber = NEW.invoiceNumber);
  RETURN NEW;
END;
$$

CREATE TRIGGER trLineIns AFTER INSERT ON Line 
FOR EACH ROW
EXECUTE FUNCTION updateClient();


-- 4) Trigger to update inventory on purchase

DROP TRIGGER IS EXISTS trProdUpd ON Product;
DROP FUNCTION IF EXISTS update_prod();

CREATE FUNCTION update_prod()
LANGUAGE plpgsql
RETURNS TRIGGER 
AS $$
BEGIN 
UPDATE ProductSET reroder = 1
WHERE productCode = NEW.productCode;
RETURNS NEW;
END;
$$

CREATE TRIGGER trProdUpd AFTER UPDATE ON Product
FOR EACH ROW
WHEN (OLD.quantityOnHand IS DISTINCT FROM NEW.quantityOnhand AND NEW.quantityOnHand < NEW.minQuantityOnHand)
EXECUTE FUNCTION update_prod();
