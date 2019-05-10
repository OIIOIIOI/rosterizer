$(document).ready(function ()
{
    var $skatersInput = $("#skaters");
    var $columnsInput = $("#columns");
    var $ratioSelect = $("#image-ratio-select");
    var $ratioInput = $("#image-ratio");
    var $gutterInput = $("#gutter");
    var $spreadCheckbox = $("#spread");
    var $alignGroup = $("#align-group");
    var $alignSelect = $("#align-select");
    var $gridAlignSelect = $("#grid-align-select");
    var $marginTopInput = $("#margin-top");
    var $marginRightInput = $("#margin-right");
    var $marginBottomInput = $("#margin-bottom");
    var $marginLeftInput = $("#margin-left");
    var $renderButton = $("#render");

    // Canvas/page
    // var canvas = new fabric.Canvas('preview');
    var canvas = new fabric.StaticCanvas('preview');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var canvasRatio = canvas.width / canvas.height;

    // Final image size
    var finalImageHeight = 0;
    var finalImageWidth = 0;

    // Render click
    $renderButton.click(calculateAndRender);
    // Ratio select change
    $ratioSelect.change(setRatio);
    setRatio();
    // Ratio select change
    $spreadCheckbox.change(setSpread);
    setSpread();

    function setRatio ()
    {
        var selected = $ratioSelect.val();
        $ratioInput.prop('disabled', true);

        switch (selected)
        {
            case 'portrait':
                $ratioInput.val(1/1.5);
                break;

            case 'landscape':
                $ratioInput.val(1.5);
                break;

            case 'custom':
                $ratioInput.prop('disabled', false);
                break;

            default:
                $ratioInput.val(1);
                break;
        }
    }

    function setSpread ()
    {
        if ($spreadCheckbox.prop('checked'))
            $alignGroup.hide();
        else
            $alignGroup.show();
    }

    function calculateAndRender ()
    {
        // Get values from inputs
        var skaters = parseInt($skatersInput.val());
        var columns = parseInt($columnsInput.val());
        var imageRatio = parseFloat($ratioInput.val());
        var gutter = parseInt($gutterInput.val());
        var spread = $spreadCheckbox.prop('checked');
        var alignment = $alignSelect.val();
        var gridAlignment = $gridAlignSelect.val();
        var margins = {
            top: parseInt($marginTopInput.val()),
            right: parseInt($marginRightInput.val()),
            bottom: parseInt($marginBottomInput.val()),
            left: parseInt($marginLeftInput.val())
        };

        // Calculate rows
        var rows = Math.ceil(skaters / columns);

        // Available space, taking borders into account
        var availableWidth = canvasWidth - gutter * (columns - 1) - margins.right - margins.left;
        var availableHeight = canvasHeight - gutter * (rows - 1) - margins.top - margins.bottom;
        var availableRatio = availableWidth / availableHeight;

        // Grid
        var gridRatio = columns / (rows / imageRatio);

        // Final gutters sizes
        var horizontalGutter = gutter;
        var verticalGutter = gutter;
        var remainingSpace = 0;
        if (gridRatio < availableRatio)
        {
            // Use height
            finalImageHeight = availableHeight / rows;
            finalImageWidth = finalImageHeight * imageRatio;
            // Spread or align horizontally
            remainingSpace = availableWidth - columns * finalImageWidth;
            if (spread)
                horizontalGutter += remainingSpace / (columns - 1);
            else
            {
                if (alignment == 'end')
                    margins.left += remainingSpace;
                else if (alignment == 'middle')
                    margins.left += remainingSpace / 2;
            }
        }
        else
        {
            // Use width
            finalImageWidth = availableWidth / columns;
            finalImageHeight = finalImageWidth / imageRatio;
            // Spread or align vertically
            remainingSpace = availableHeight - rows * finalImageHeight;
            if (spread)
                verticalGutter += remainingSpace / (rows - 1);
            else
            {
                if (alignment == 'end')
                    margins.top += remainingSpace;
                else if (alignment == 'middle')
                    margins.top += remainingSpace / 2;
            }
        }

        // Clear canvas
        canvas.clear();

        // Render loop
        var innerMargin = 0;
        for (var i = 0; i < skaters; i++)
        {
            var x = i % columns;
            var y = Math.floor(i / columns);

            if (y == rows - 1 && x == 0 && gridAlignment != 'left')
            {
                var remainingImages = skaters - i;
                availableWidth = canvasWidth - horizontalGutter * (remainingImages - 1) - margins.right - margins.left;
                remainingSpace = availableWidth - remainingImages * finalImageWidth;

                if (gridAlignment == 'right')
                    innerMargin = remainingSpace;
                else if (gridAlignment == 'center')
                    innerMargin = remainingSpace / 2;
            }

            var options = {
                left: x * (finalImageWidth + horizontalGutter) + margins.left + innerMargin,
                top: y * (finalImageHeight + verticalGutter) + margins.top
            };
            fabric.Image.fromURL('https://picsum.photos/'+Math.floor(finalImageWidth)+'/'+Math.floor(finalImageHeight)+'/?'+Math.random(), imageLoaded, options);
        }
    }

    function imageLoaded (img)
    {
        if (jQuery.isEmptyObject(img.getElement()))
        {
            var rect = new fabric.Rect({
                left: img.get('left'),
                top: img.get('top'),
                fill: '#CCCCCC',
                width: finalImageWidth,
                height: finalImageHeight
            });
            canvas.add(rect);
        }
        else
            canvas.add(img);
    }
});
