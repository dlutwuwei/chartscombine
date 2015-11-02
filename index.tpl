
<% for(var i=0; i< actions.length; i++){ %>
<% var item = actions[i];%>
	<div class="row">
		<div class="col-xs-12 col-sm-12 col-md-12">
			<h4>学费日报表<%=item.id%><span class="label label-default"><%=item.name%></span></h4>
		</div>
	  	<div class="col-xs-8 col-sm-8 col-md-8">	
		  	<div class="input-group">
				<span class="input-group-btn">
			        <button class="btn btn-default choose" type="button" onclick="$(this).parent().parent().find('input[type=file]').click();">选择文件</button>
			    </span>
			    <input id="leftfile" type="text" class="form-control">
			   	<input class="form-control" id="fileDialog" type="file" style='display:none;'/>
		  	</div>
		</div>
	  <div class="col-xs-4 col-sm-4 col-md-4"><button id='btn' map='<%=item.id%>' type='button' class='btn btn-primary import'>&nbsp;&nbsp;导入&nbsp;&nbsp;</button>
		</div>
	</div>
<%}%>
	<div class="row">
		<div class="col-md-12 mtb">
		<input id="file_input" type="file" nwsaveas='out.csv' style="display:none;"/>
		<button id='output' type="button" class="btn btn-primary btn-lg">导出合并后的文件</button>	
		</div>
	</div>